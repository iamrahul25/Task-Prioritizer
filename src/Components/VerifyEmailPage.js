import React from 'react';
import styles from '../CSS/VerifyEmailPage.module.css';
import img from '../img/img-verify-email-page.png';

//React Icons (Library)
import { MdEmail } from "react-icons/md";


function VerifyEmailPage() {
    return (
        <div className={styles.verify_email_page_div}>
            <div className={styles.image_div}>
                <img className={styles.image} src={img} alt=""/>
            </div>

            <h2 className={styles.heading}>Verify Email</h2>
            <p className={styles.para}>
                Verify your Email Address!
            </p>

            <div className={styles.input_div}>
                <MdEmail color='black' size={20}/>
                <input className={styles.input_field} placeholder="Email ID" type="email" name="" id="email"/>
            </div>

            <button className={styles.button}>Forgot Password</button>

        </div>
    );
}

export default VerifyEmailPage;