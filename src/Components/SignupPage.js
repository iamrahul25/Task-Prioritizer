import { useRef } from 'react';
import styles from '../CSS/SignupPage.module.css';

// Lucide Icons
import { Mail, Lock, User } from "lucide-react";

//Firebase 
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../firebase';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';

function SignupPage() {

    //Context API
    const { showPages, setShowPages } = useTaskContext();

    //useRef
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const handleNavigateLoginPage = () => {
        // console.log("Login Clicked!");
        setShowPages({ ...showPages, loginPage: 1, signupPage: 0 });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("Sign Up Clicked!");

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        // console.log({ email, password, confirmPassword });

        if(password!==confirmPassword){
            window.alert("Password and Confirm Password do not match!");
            return;
        }
        else{

            try{
                //User Registration - Firebase
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('User registered successfully!');

                //Sending Email Verification
                await sendEmailVerification(auth.currentUser);
                window.alert('📧 Verification email sent!');
            }
            catch(error){
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
        }

    }

    return (
        <div className={styles.signup_page_div}>
            <div className={styles.card_container}>
                <div className={styles.header}>
                    <div className={styles.icon_circle}>
                        <User />
                    </div>
                    <h2 className={styles.heading}>Create Account</h2>
                    <p className={styles.para}>
                        Sign up to get started
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                <div className={styles.input_div}>
                    <Mail />
                    <input required ref={emailRef} className={styles.input_field} placeholder="Email Address" type="email" name="" id="email" />
                </div>

                <div className={styles.input_div}>
                    <Lock />
                    <input required ref={passwordRef} className={styles.input_field} placeholder="Password" type="password" name="" id="password" />
                </div>

                <div className={styles.input_div}>
                    <Lock />
                    <input required ref={confirmPasswordRef} className={styles.input_field} placeholder="Confirm Password" type="password" name="" id="confirm_password" />
                </div>

                <button type='submit' className={styles.button}>Sign Up </button>

                </form>

                <p className={`${styles.para} ${styles.para2}`}>
                    Already have an account? <span onClick={handleNavigateLoginPage} className={styles.anchor_tag}>Login</span>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;