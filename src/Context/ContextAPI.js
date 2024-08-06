import {createContext, useContext, useState, useEffect } from "react";

//Firebase Authenticaion
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from '../firebase';

//Firebase Firestore
import {db} from '../firebase'
import {collection, getDocs, addDoc, updateDoc, query, where, deleteDoc, doc} from 'firebase/firestore';

export const TaskContext = createContext({});

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskContextProvider = ({children}) => {

    //Firebase Firestore
    const tasksCollectionRef = collection(db, 'tasks');

    const [showPages, setShowPages] = useState({
        homePage: 0,
        loginPage: 0,
        signupPage: 0,
        forgotPasswordPage: 0,
        dashboardPage: 0,
        addNewTaskPage: 0,
        searchTaskPage: 0,
        editTaskPage: 0,
    });

    const [lengthOfTasks, setLengthOfTasks] = useState({
        all: 0,
        completed: 0,
        not_completed: 0,
        deadline_miss: 0
    });

    //Array of All Tasks - If present in Local Storage, get it from there else empty array
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTaskList, setFilteredTaskList] = useState([]);

    const [userEmailID, setUserEmailID] = useState("");
    const [mailVerified, setMailVerified] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState({});


    //CRUD - Read, Write, Update Delete Operations in Database---------------------
    const handleSaveOrUpdateData = async () => {
        try{

            const userQuery = query(tasksCollectionRef, where("email", "==", userEmailID));
            const queryData = await getDocs(userQuery);

            //If Data Exists, Update Data
            if(!queryData.empty){
                const userDoc = queryData.docs[0];
                await updateDoc(userDoc.ref, {allTasks: allTasks});
                console.log("Data Exists Already! Data Updated Successfully!");
            }
            
            //If Data Does Not Exist, Save Data
            else{
                await addDoc(tasksCollectionRef, {allTasks: allTasks, email: userEmailID});
                console.log("No Data Exists! Data Saved Successfully!");
            }

        }
        catch(error){
            console.error("Error Saving/Updating Data!", error.message);
        }
    }

    const handleFetchData = async (emailID) => {
        
        try{

            const userQuery = query(tasksCollectionRef, where("email", "==", emailID));
            const queryData = await getDocs(userQuery);
            if(!queryData.empty){
                const userDoc = queryData.docs[0];
                const userData = userDoc.data();
                console.log("User Data Fetched Successfully: ");
                // console.log("User Data Fetched Successfully: ", userData);

                //Update setAllTasks with Data from Database
                setAllTasks(userData.allTasks);
            }
            else{
                console.log("No User Data Found!");
            }

        }
        catch(error){
            console.error("Error Fetching Data!", error.message);
        }
    }

    const handleDeleteData = async () => {
        try{
            const userQuery = query(tasksCollectionRef, where("email", "==", userEmailID));
            const queryData = await getDocs(userQuery);

            if(!queryData.empty){
                const userDoc = queryData.docs[0];
                await deleteDoc(userDoc.ref);
                console.log("Data Deleted Successfully!");
            }
            else{
                console.log("No Data Found to Delete!");
            }
        }

        catch(error){
            console.error("Error Deleting Data!", error.message);
        }
    }

    //Check if User Data in Browser present or not!
    useEffect(() => {

        //Call backfunction to first check if lastSyncTimestamp is present! if not present then fetch data.
        const st = localStorage.getItem("lastSyncTime");

        //Check if User Data Exists -> Email is Present or Not
        const checkLogin = auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log("User Login Data Present! \n");
                // console.log("User Login Data Present! \n", user);
                setUserEmailID(user.email);

                //Check if Email is Verified
                if (user.emailVerified) {
                    setMailVerified(true);
                    console.log("Email is Verified!");

                    await handleFetchData(user.email);

                    //Show Pages 
                    setShowPages({...showPages, homePage: 0, dashboardPage: 1});

                } else {

                    //Show Pages
                    setShowPages({...showPages, homePage: 1});

                    setMailVerified(false);
                    window.alert("📧 Email is Not Verified! \n🙏 Please check your Mail and Verify!");
                    console.log("Email is Not Verified!");
                }

            } else {
                //Show Pages
                setShowPages({...showPages, homePage: 1});
                console.log("No User Login Data Present! \n");
            }
        });

    }, []);

    //Change length of different tasks list.
    const updateLenghtMethod = () => {
        let completed = 0, not_completed = 0, deadline_miss = 0;
        allTasks.map((task) => {
            if (task.taskDone) {
                completed++;
            } else {
                not_completed++;
            }

            let today = new Date();
            let deadline = new Date(task.deadline);
            if (today > deadline) {
                deadline_miss++;
            }
        });

        setLengthOfTasks({
            all: allTasks.length,
            completed: completed,
            not_completed: not_completed,
            deadline_miss: deadline_miss
        });
    }


    //Every time allTasks array changes
    useEffect(() => {
        //Save Data to Firestore
        handleSaveOrUpdateData();
        //Update Length of different tasks list.
        updateLenghtMethod();
    }, [allTasks]);


    //Context API Export
    const value = {
        allTasks, setAllTasks,
        lengthOfTasks, setLengthOfTasks,
        filteredTaskList, setFilteredTaskList,
        showPages, setShowPages,
        taskToEdit, setTaskToEdit,
        userEmailID, setUserEmailID,
        mailVerified, setMailVerified,
        handleFetchData,
        handleSaveOrUpdateData,
    };

    return <TaskContext.Provider value={value}> {children} </TaskContext.Provider>;
};