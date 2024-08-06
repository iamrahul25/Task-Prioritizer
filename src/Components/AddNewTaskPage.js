import react from 'react';
import styles from '../CSS/AddNewTaskPage.module.css';
import { IoIosAdd } from "react-icons/io";
import { FaTasks } from "react-icons/fa";

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';


function AddNewTaskPage() {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks } = useTaskContext();


    const handleSubmitForm = (e) => {
        e.preventDefault();

        // console.log("Form Submitted ! \n");

        //Get the values from the form
        const task = e.target[0].value;
        const duration = e.target[1].value;
        const deadline = e.target[2].value;
        const priority = parseInt(e.target[3].value);

        //Get Values of Radio Buttons
        const importance = e.target[4].checked;
        const urgency = e.target[6].checked;
        console.log(e.target[4].checked, e.target[5].checked, e.target[6].checked, e.target[7].checked);

        let impAndUrgNo = 4;
        if (importance && urgency) impAndUrgNo = 1;
        else if (!importance && urgency) impAndUrgNo = 2;
        else if (importance && !urgency) impAndUrgNo = 3;
        else impAndUrgNo = 4;

        //Textarea data value with id = "keywords"
        const textareaString = e.target[8].value;

        //Split the string by comma, remove extra space and remove empty strings
        const keywords = textareaString.split(",").map((keyword) => keyword.trim()).filter((keyword) => keyword !== "");
        // console.log("Keywords:", keywords, "\n");

        //Get current datestring and timestamp 
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        const dateString = year + "-" + month + "-" + day;
        const timeStamp = date.getTime();

        const formValues = { taskDone: false, task, duration, deadline, dateOfCompletion: "", priority, impAndUrgNo, dateString, timeStamp, keywords };
        // console.log("Form Values:", formValues, "\n");

        //Inserting Values into the All Tasks Array
        setAllTasks([...allTasks, formValues]);

        //Close the Create New Task Page
        setShowPages({ ...showPages, addNewTaskPage: 0, dashboardPage: 1 });
    }


    const handleClose = () => {
        // console.log("Close Button Clicked!");

        //Close the Create New Task Page
        setShowPages({ ...showPages, addNewTaskPage: 0, dashboardPage: 1 });

    }


    return (
        <form onSubmit={handleSubmitForm} className={styles.input_form}>

            <div>
                <h2> <FaTasks color='darkorange' size={25} /> Task Prioritizer </h2>
                <br />
                <p>Create your new Task!</p>
            </div>

            <div className={styles.input_field_div}>
                <label>Task</label>
                <input required className={styles.input_field} type="text" placeholder="Eg: Make Food" />
            </div>

            <div className={styles.input_field_div}>
                <label>Duration (Hours)</label>
                <input required className={styles.input_field} type="text" placeholder="Eg: 2" />
            </div>

            <div className={styles.input_field_div_two_divs}>

                <div className={styles.input_field_div}>
                    <label>Deadline (Date)</label>
                    <input required className={styles.input_field} type="date" />
                    <small>Eg: 12/31/2024</small>
                </div>

                <div className={styles.input_field_div}>
                    <label>Priority No.</label>
                    <input required className={styles.input_field} type="number" placeholder="Eg: 10" />
                    <small>Higher no. = More priority</small>
                </div>

            </div>

            <div className={styles.input_field_div_two_divs}>

                <div className={styles.input_field_div}>

                    <label>Importance</label>

                    <div className={styles.radio_option_div}>
                        <input required type="radio" name="importance" id="imp" />
                        <label className={styles.light_label} htmlFor="imp">Important</label>
                    </div>

                    <div className={styles.radio_option_div}>
                        <input required type="radio" name="importance" id="not-imp" />
                        <label className={styles.light_label} htmlFor="not-imp">Not Important</label>
                    </div>
                </div>

                <div className={styles.input_field_div}>
                    <label>Urgency</label>

                    <div className={styles.radio_option_div}>
                        <input required type="radio" name="urgency" id="urgent" />
                        <label className={styles.light_label} htmlFor="urgent">Urgent</label>
                    </div>

                    <div className={styles.radio_option_div}>
                        <input required type="radio" name="urgency" id="not-urgent" />
                        <label className={styles.light_label} htmlFor="not-urgent">Not Urgent</label>
                    </div>
                </div>

            </div>

            <div className={styles.input_field_div}>
                <label>Type Keywords</label>
                <textarea className={styles.input_field} placeholder="Eg: todo, food, freetime" rows="3"></textarea>
                <small>Enter comma separated keywords</small>
                <br />
            </div>

            <div className={styles.input_field_div_two_divs}>
                <button type='submit' className={styles.button1}>
                    <IoIosAdd />
                    Add Task
                </button>

                <button onClick={handleClose} type='button' className={styles.button2}>
                    Close
                </button>
            </div>

        </form>

    )

}

export default AddNewTaskPage;
