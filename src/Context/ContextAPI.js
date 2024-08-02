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

    //New-------------------------------------------------------------
    const [showPages, setShowPages] = useState({
        homePage: 0,
        loginPage: 0,
        signupPage: 0,
        forgotPasswordPage: 0,
        dashboardPage: 0,
        addNewTaskPage: 0,
        searchTaskPage: 0,
    });

    const [userEmail, setUserEmail] = useState("");
    const [mailVerified, setMailVerified] = useState(false);

    //Array of All Tasks - If present in Local Storage, get it from there else empty array
    const [allTasks, setAllTasks] = useState(() => {
        const savedTasks = localStorage.getItem("allTasks");
        if(savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [];
        }
    });


    //Method to run when webpage is loaded!
    const handleFetchData = async (emailID) => {
        
        try{

            const userQuery = query(tasksCollectionRef, where("email", "==", emailID));
            const queryData = await getDocs(userQuery);
            if(!queryData.empty){
                const userDoc = queryData.docs[0];
                const userData = userDoc.data();
                console.log("User Data Fetched Successfully: ", userData);

                //Update setAllTasks with Data from Database
                setAllTasks(userData.allTasks);

                //Update syncTimeStamp
                // setSyncTimeStamp(userData.syncTimeStamp);

                //Update Sync Time String
                // const timeString = getTimeString(Date.now(), userData.syncTimeStamp);
                // setSyncTimeString(timeString);
                // console.log("Sync Time String: ", timeString);
            }
            else{
                console.log("No User Data Found!");
            }

        }
        catch(error){
            console.error("Error Fetching Data!", error.message);
        }
    }

    //Check if User Data in Browser present or not!
    useEffect(() => {

        //Check if User Data Exists -> Email is Present or Not
        const checkLogin = auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log("User Login Data Present! \n", user);
                setUserEmail(user.email);

                //Check if Email is Verified
                if (user.emailVerified) {
                    setMailVerified(true);
                    console.log("Email is Verified!");

                    //Show Pages 
                    setShowPages({...showPages, homePage: 0, dashboardPage: 1});

                    //Fetch Data from Database
                    await handleFetchData(user.email);

                    //Console Log
                    console.log(showPages);

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


    //New-------------------------------------------------------------




    //States:
	const [showCreateNewTaskPage, setShowCreateNewTaskPage] = useState(false);
    const [showSearchTaskPage, setShowSearchTaskPage] = useState(false);

    const [showTaskList, setShowTaskList] = useState({
        notCompleted: false,
        completed: false,
        notDoneOnDeadline: false,
    });

    

    const [showEditTaskPage, setShowEditTaskPage] = useState(false);
    const [editTaskData, setEditTaskData] = useState({
        task: "",
        duration: "",
        deadline: "",
        dateOfCompletion: "",
        priority: "",
        important: false,
        urgent: false,
        impAndUrgNo: 4,
        timeStamp: "",
        dateString: "",
        taskDone: false,
    });


    const [lastSyncTime, setLastSyncTime] = useState(()=>{
        const savedLastSyncTime = localStorage.getItem("lastSyncTime");
        if(savedLastSyncTime){
            return savedLastSyncTime;
        } else {
            
            const currentTimestamp = Date.now();
            return currentTimestamp;
        }
    })

    //Search Task List
    const [searchTaskList, setSearchTaskList] = useState([]);


    //Methods:--------------------------------------------------------
    

    //UseEffect:
    //Every time allTasks array changes, save it to the Local Storage 
    useEffect(() => {
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
    }, [allTasks]);

    useEffect(() => {
        localStorage.setItem("lastSyncTime", lastSyncTime);
    }, [lastSyncTime]);


    //Context API Export
    const value = {

        showCreateNewTaskPage, setShowCreateNewTaskPage,

        showSearchTaskPage, setShowSearchTaskPage,

        allTasks, setAllTasks,

        searchTaskList, setSearchTaskList,

        showEditTaskPage, setShowEditTaskPage,

        editTaskData, setEditTaskData,

        showTaskList, setShowTaskList,

        lastSyncTime, setLastSyncTime,




        showPages, setShowPages,


    };

    return <TaskContext.Provider value={value}> {children} </TaskContext.Provider>;
};