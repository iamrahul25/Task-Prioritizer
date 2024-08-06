import React from 'react';
import styles from '../CSS/HomePage.module.css';
import img from '../img/img-home-page.png';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';

function HomePage() {

    //Context API
    const {showPages, setShowPages} = useTaskContext();

    const handleLoginButton = () => {
        // console.log("Login Button Clicked!");
        setShowPages({...showPages, homePage: 0, loginPage: 1});
    }

    const handleSignUpButton = () => {
        // console.log("Sign Up Button Clicked!");
        setShowPages({...showPages, homePage: 0, signupPage: 1});
    }


    return (
        <div className={styles.home_page_div}>
            <div className={styles.image_div}>
                <img className={styles.image} src={img} alt="" />
            </div>

            <h2 className={styles.heading}>Task Prioritizer</h2>
            <p className={styles.para}>
                Welcome, to Task Prioritizer. Faster and easier way to manage your tasks. Set deadlines, urgency and
                importance of your tasks.
            </p>

            <p className={styles.para}>
                Login or Sign Up to your account to get started.
            </p>

            <button onClick={handleLoginButton}  className={`${styles.button} ${styles.button1}`}>Login In</button>
            <br />
            <button onClick={handleSignUpButton} className={`${styles.button} ${styles.button2}`}>Sign Up</button>
        </div>
    );
}

export default HomePage;