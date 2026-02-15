import React, { useRef } from 'react';
import styles from '../CSS/ForgotPasswordPage.module.css';
import img from '../img/img-forgot-password-page.png';

// Lucide Icons
import { Mail } from "lucide-react";

//Firebase
import { auth, sendPasswordResetEmail } from '../firebase';


function ForgotPasswordPage() {


    //useRef
    const emailRef = useRef();

    const sendResetPasswordMail = async() => {
        const email = emailRef.current.value;
        console.log("Forgot Password Clicked!", {email});

        if(email === ""){
            window.alert("❌🙅‍♂️ Please Enter Email ID!");
            return;
        }
        else{
            try {
                await sendPasswordResetEmail(auth, email);
                window.alert('📩 Password reset email Sent!');
    
            } catch (error) {
                window.alert(`❌🙅‍♂️ Error Sending forgot password mail! \n ${error.message}`);
                console.error("😢 Error Sending forgot password mail!",error.message);
            }
        }
    }

    return (
        <div className={styles.forgot_password_page_div}>
            <div className={styles.image_div}>
                <img className={styles.image} src={img} alt=""/>
            </div>

            <h2 className={styles.heading}>Forgot Password</h2>
            <p className={styles.para}>
                Enter your email address to reset your password!
            </p>

            <div className={styles.input_div}>
                <Mail color='black' size={20}/>
                <input ref={emailRef} className={styles.input_field} placeholder="Email ID" type="email" name="" id="email"/>
            </div>

            <button onClick={sendResetPasswordMail} className={styles.button}>Forgot Password</button>
        </div>
    );
}

export default ForgotPasswordPage;