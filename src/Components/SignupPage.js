import { useRef } from 'react';
import styles from '../CSS/SignupPage.module.css';
import img from '../img/img-signup-page.png';

//React Icons (Library)
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiLockPasswordLine } from "react-icons/ri";

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
        console.log("Login Clicked!");
        setShowPages({ ...showPages, loginPage: 1, signupPage: 0 });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Sign Up Clicked!");

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        console.log({ email, password, confirmPassword });

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
            <div className={styles.image_div}>
                <img className={styles.image} src={img} alt="" />
            </div>

            <h2 className={styles.heading}>Sign Up</h2>
            <p className={styles.para}>
                Hello, welcome back!
            </p>

            <form onSubmit={handleSubmit}>

                <div className={styles.input_div}>
                    <MdEmail color='black' size={20} />
                    <input required ref={emailRef} className={styles.input_field} placeholder="Email ID" type="email" name="" id="email" />
                </div>

                <div className={styles.input_div}>
                    <RiLockPasswordFill color='black' size={20} />
                    <input required ref={passwordRef} className={styles.input_field} placeholder="Password" type="password" name="" id="password" />
                </div>

                <div className={styles.input_div}>
                    <RiLockPasswordLine color='black' size={20} />
                    <input required ref={confirmPasswordRef} className={styles.input_field} placeholder="Confirm Password" type="password" name="" id="confirm_password" />
                </div>

                <button type='submit' className={styles.button}>Sign Up </button>

            </form>

            <p className={`${styles.para} ${styles.para2}`}>
                Already have account? <span onClick={handleNavigateLoginPage} className={styles.anchor_tag}>Login</span>
            </p>

        </div>
    );
}

export default SignupPage;