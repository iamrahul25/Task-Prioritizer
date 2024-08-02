import React from 'react';
import styles from '../CSS/ForgotPasswordPage.module.css';
import img from '../img/img-forgot-password-page.png';

//React Icons (Library)
import { MdEmail } from "react-icons/md";


function ForgotPasswordPage() {
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
                <MdEmail color='black' size={20}/>
                <input className={styles.input_field} placeholder="Email ID" type="email" name="" id="email"/>
            </div>

            <button className={styles.button}>Forgot Password</button>

        </div>
    );
}

export default ForgotPasswordPage;