import React from 'react';
import { useState } from 'react';
import styles from '../CSS/LoginPage.module.css';
import img from '../img/img-login-page.png';

//useRef
import { useRef } from 'react';

//React Icons (Library)
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

//Firebase
import { auth, signInWithEmailAndPassword } from '../firebase';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';


function LoginPage() {

    //Context API
    const { showPages, setShowPages, userEmailID, setUserEmailID} = useTaskContext();

    //useRef
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSignupPage = () => {
        console.log("Sign Up Clicked!");
        setShowPages({ ...showPages, loginPage: 0, signupPage: 1 });
    }

    const handleForgotPasswordPage = () => {
        console.log("Forgot Password Clicked!");
        setShowPages({ ...showPages, loginPage: 0, forgotPasswordPage: 1 });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login Clicked!");

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        console.log({ email, password });

        try {
            const user = await signInWithEmailAndPassword(auth, email, password);

            // Set User Email
            console.log("User Email: ", user.user.email);
            setUserEmailID(user.user.email);

            // Show Pages
            setShowPages({ ...showPages, loginPage: 0, dashboardPage: 1 });

            console.log('Logged in successfully!');
            window.alert("✅🙋‍♂️ Logged In Successfully!");

        } catch (error) {
            // Handle Errors here.
            if (error.code === 'auth/user-not-found') {
                window.alert("⚠️ User not found!");
            } else if (error.code === 'auth/invalid-credential') {
                window.alert("⚠️ Invalid Email Id or Password!");
            } else if (error.code === 'auth/invalid-email') {
                window.alert("⚠️ Invalid Email ID!");
            } else if (error.code === 'auth/wrong-password') {
                window.alert("⚠️ Wrong Password!");
            } else {
                console.error(error.message);
                window.alert("⚠️ Error! " + error.message);
            }
        }
    }

    return (
        <div className={styles.login_page_div}>
            <div className={styles.image_div}>
                <img className={styles.image} src={img} alt="" />
            </div>

            <h2 className={styles.heading}>Login</h2>
            <p className={styles.para}>
                Hello, wecome back!
            </p>

            <form style={{width:"100%"}} onSubmit={handleSubmit}>

                <div className={styles.input_div}>
                    <MdEmail color='black' size={20} />
                    <input required ref={emailRef} className={styles.input_field} placeholder="Email ID" type="email" name="" id="email" />
                </div>

                <div className={styles.input_div}>
                    <RiLockPasswordFill color='black' size={20} />
                    <input required ref={passwordRef} className={styles.input_field} placeholder="Password" type="password" name="" id="password" />
                    
                </div>

                <div className={styles.forgot_password_div}>
                    <span onClick={handleForgotPasswordPage} className={styles.forgot_password_link}> Forgot Password?</span>
                </div>

                <button className={styles.button}>Login</button>

            </form>

            <p className={`${styles.para} ${styles.para2}`}>
                Don't have an account? <span onClick={handleSignupPage} className={styles.anchor_tag}>Sign Up</span>
            </p>

        </div>
    );
}

export default LoginPage;