import { React, useEffect, useState, useRef } from 'react';

//Firebase Authenticaion
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from './firebase';

//Firebase Firestore
import {db} from './firebase';
import {collection, getDocs, addDoc, updateDoc, query, where, deleteDoc, doc} from 'firebase/firestore';

//Context API
import { TaskContext, useTaskContext } from './Context/ContextAPI';

function AuthPage() {

    const [userEmail, setUserEmail] = useState("");
    const [mailVerified, setMailVerified] = useState(false);
    const [syncTimeStamp, setSyncTimeStamp] = useState("");
    const [syncTimeString, setSyncTimeString] = useState("Not Synced Yet!");

    //Context API
    const {allTasks, setAllTasks} = useTaskContext();

    //Login - email, password
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();

    //Register - name, email, password
    const registerNameRef = useRef();
    const registerEmailRef = useRef();
    const registerPasswordRef = useRef();

    //Forgot Password - email
    const forgotPasswordEmailRef = useRef();

    //Firebase Firestore
    const tasksCollectionRef = collection(db, 'tasks');

    // Register Page - Methods-----------------------------------------------------
    const handleRegister = async () => {
        try {
            const name = registerNameRef.current.value;
            const email = registerEmailRef.current.value;
            const password = registerPasswordRef.current.value;
    
            console.log("Name: ", name);
            console.log("Email: ", email);
            console.log("Password", password);

            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered successfully!');

            //Sending Email Verification
            await sendEmailVerification(auth.currentUser);
            window.alert('📧 Verification email sent!');

        } catch (error) {

            // Handle Errors here.
            if (error.code === 'auth/email-already-in-use') {
                window.alert("Email ID is Already Registered!");
            }
            else if (error.code === 'auth/invalid-email') {
                window.alert("Invalid Email ID!");
            }
            else if (error.code === 'auth/weak-password') {
                window.alert("Password is too weak!");
            }
            else {
                console.error(error.message);
                window.alert("Error: " + error.message);
            }
        }
    };


    // Login Page - Methods--------------------------------------------------------
    const handleLogin = async () => {
        try {
            const email = loginEmailRef.current.value;
            const password = loginPasswordRef.current.value;
            console.log("Email: ", email); 
            console.log("Password: ", password);

            await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged in successfully!');
            window.alert("✅🙋‍♂️ Logged In Successfully!");
        } catch (error) {
            // Handle Errors here.
            if (error.code === 'auth/user-not-found') {
                window.alert("⚠️ User not found!");
            }
            else if (error.code === 'auth/invalid-credential') {
                window.alert("⚠️ Invalid Email Id or Password!");
            }
            else if (error.code === 'auth/invalid-email') {
                window.alert("⚠️ Invalid Email ID!");
            }
            else if (error.code === 'auth/wrong-password') {
                window.alert("⚠️ Wrong Password!");
            }
            else {
                console.error(error.message);
                window.alert("⚠️ Error! " + error.message);
            }
        }
    };

    const handleLogOut = async () => {
        try {

            //Update or Save Data in Database
            await handleSaveOrUpdateData();

            //Set All Tasks to Empty Array
            setAllTasks([]);
            //Set User Email to Empty
            setUserEmail("");

            //Sign Out - Firebase Auth
            await auth.signOut();

            console.log("Logged Out Successfully!");
            window.alert("✅📤 Logged Out Successfully!");

        } catch (error) {
            console.error(error.message);
            window.alert("Error: " + error.message);
        }
    };

    // Forgot Password Page - Methods----------------------------------------------
    const handleForgotPassword = async () => {
        try {
            // Send password reset email
            const email = forgotPasswordEmailRef.current.value;
            await sendPasswordResetEmail(auth, email);
            window.alert('📩 Password reset email Sent!');

        } catch (error) {
            console.error("😢 Error Sending forgot password mail!",error.message);
        }
    };


    //Convert TimeStamp to Days, Hours, Minutes, Seconds
    const getTimeString = (timeStamp1, timeStamp2) => {

        let timeStamp = timeStamp1 - timeStamp2;
        //Parse TimeStamp to Integer
        timeStamp = parseInt(timeStamp);
        let timeString = "";

        // Convert Time to Days
        const days = Math.floor(timeStamp / (1000 * 60 * 60 * 24));
        const daysRemainder = timeStamp % (1000 * 60 * 60 * 24);

        // Convert Time to Hours
        const hours = Math.floor(daysRemainder / (1000 * 60 * 60));
        const hoursRemainder = daysRemainder % (1000 * 60 * 60);

        // Convert Time to Minutes
        const minutes = Math.floor(hoursRemainder / (1000 * 60));
        const minutesRemainder = hoursRemainder % (1000 * 60);

        // Convert Time to Seconds
        const seconds = Math.floor(minutesRemainder / 1000);
        const secondsRemainder = minutesRemainder % 1000;

        if (days > 0) timeString += days + " day ";
        if (hours > 0) timeString += hours + " hr ";
        if (minutes > 0) timeString += minutes + " min ";
        if (seconds > 0) timeString += seconds + " sec ";

        timeString += "ago";

        return timeString;
    }


    //CRUD - Read, Write, Update Delete Operations in Database---------------------
    const handleSaveOrUpdateData = async () => {
        try{

            const userQuery = query(tasksCollectionRef, where("email", "==", userEmail));
            const queryData = await getDocs(userQuery);

            //If Data Exists, Update Data
            if(!queryData.empty){
                const userDoc = queryData.docs[0];
                await updateDoc(userDoc.ref, {allTasks: allTasks, syncTimeStamp: Date.now()});
                console.log("Data Exists Already! Data Updated Successfully!");
            }
            
            //If Data Does Not Exist, Save Data
            else{
                await addDoc(tasksCollectionRef, {allTasks: allTasks, email: userEmail, syncTimeStamp: Date.now()});
                console.log("No Data Exists! Data Saved Successfully!");
            }

            const timeString = getTimeString(Date.now(), syncTimeStamp);
            setSyncTimeString(timeString);
            console.log("Sync Time String: ", timeString);

            //Set SyncTimeStamp 
            setSyncTimeStamp(Date.now());
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
                console.log("User Data Fetched Successfully: ", userData);

                //Update setAllTasks with Data from Database
                setAllTasks(userData.allTasks);

                //Update syncTimeStamp
                setSyncTimeStamp(userData.syncTimeStamp);

                //Update Sync Time String
                const timeString = getTimeString(Date.now(), userData.syncTimeStamp);
                setSyncTimeString(timeString);
                console.log("Sync Time String: ", timeString);
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
            const userQuery = query(tasksCollectionRef, where("email", "==", userEmail));
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

        //Check if User Data Exists -> Email is Present or Not
        const checkLogin = auth.onAuthStateChanged(async(user) => {
            if (user) {
                console.log("User Login Data Present! \n", user);
                setUserEmail(user.email);

                //Check if Email is Verified
                if (user.emailVerified) {
                    setMailVerified(true);
                    console.log("Email is Verified!");

                    //Fetch Data from Database
                    await handleFetchData(user.email);

                } else {
                    setMailVerified(false);
                    window.alert("📧 Email is Not Verified! \n🙏 Please check your Mail and Verify!");
                    console.log("Email is Not Verified!");
                }

            } else {
                console.log("No User Login Data Present! \n");
            }
        });

    }, []);


    //Call Sync Time Every 1 Minute
    useEffect(() => {
        const interval = setInterval(() => {
            if(syncTimeStamp === "") return;
            const timeString = getTimeString(Date.now(), syncTimeStamp);
            setSyncTimeString(timeString);
        }, 1000);

        return () => clearInterval(interval);
    }, [syncTimeStamp]);


    return (

        <div>

            <div>
                <h1>Save / Sync Data in Database</h1>
                <p>Last Sync: {syncTimeString} </p>
                <button onClick={handleSaveOrUpdateData}> Save / Sync Data</button>
                {/* <button onClick={handleFetchData}>Fetch Data</button> */}
                {/* <button onClick={handleDeleteData}>Delete Data</button> */}
            </div>

            <div>
                <h1>Log In</h1>
                <label htmlFor="email">Email </label>
                <input type="email" ref={loginEmailRef} />
                <br />
                <label htmlFor="password">Password </label>
                <input type="password" ref={loginPasswordRef} />
                <br />

                <button onClick={handleLogin}>Log In</button>
                <button onClick={handleLogOut}> Log out </button>
                

            </div>

            <div>
                <h1>Forgot Password</h1>
                <label htmlFor="email">Email </label>
                <input type="email" ref={forgotPasswordEmailRef} /> 
                <br />
                <button onClick={handleForgotPassword}> Forgot Password </button>
            </div>

            <div>
                <h1>Register</h1>

                <label htmlFor="name">Name</label>
                <input type="text" ref={registerNameRef} />
                <br />

                <label htmlFor="email">Email </label>
                <input type="email" ref={registerEmailRef} />
                <br />

                <label htmlFor="password">Password </label>
                <input type="password" ref={registerPasswordRef} />
                <br />
                <button onClick={handleRegister}>Register</button>
            </div>

        </div>



    );
}

export default AuthPage;