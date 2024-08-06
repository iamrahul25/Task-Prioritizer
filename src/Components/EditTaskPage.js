import react from 'react';
import styles from '../CSS/AddNewTaskPage.module.css';
import { IoIosAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";


//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';


function EditTaskPage({taskData}) {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks } = useTaskContext();

    // console.log("Task Data (To Edit!):", taskData);


    const handleClose = () => {
        // console.log("Close Button Clicked!");

        //Closing the Edit Task Page
        setShowPages({...showPages, editTaskPage:false, dashboardPage:true});
    }


    const handleSubmitForm = (e) => {

        e.preventDefault();
        
        //ID -> timeStamp
        const id = taskData.timeStamp;
        // console.log("Edited Task! ID:", id);

        //Form Values
        const task = e.target[0].value;
        const duration = e.target[1].value;
        const deadline = e.target[2].value;
        const priority = parseInt(e.target[3].value);
        
        //Get Values of Radio Buttons
        const importance = e.target[4].checked;
        const urgency = e.target[6].checked;
        console.log(e.target[4].checked, e.target[5].checked,e.target[6].checked, e.target[7].checked);

        let impAndUrgNo = 4;
        if(importance && urgency) impAndUrgNo = 1;
        else if(!importance && urgency) impAndUrgNo = 2;
        else if(importance && !urgency) impAndUrgNo = 3;
        else impAndUrgNo = 4;

        //Textarea data value with id = "keywords"
        const textareaString = e.target[8].value;

        //Split the string by comma, remove extra space and remove empty strings
        const keywords = textareaString.split(",").map((keyword) => keyword.trim()).filter((keyword) => keyword !== "");

        //Get current datestring and timestamp
        const dateString = taskData.dateString;
        const timeStamp = taskData.timeStamp;
        const dateOfCompletion = taskData.dateOfCompletion;

        const formValues = {taskDone:false, task, duration, deadline, dateOfCompletion, priority, impAndUrgNo, dateString, timeStamp, keywords};
        // console.log("Form Values:", formValues, "\n");

        //Removing the Old Task
        let newAllTasks = allTasks.filter((task) => task.timeStamp !== id);

        //Inserting the New Task
        newAllTasks = [...newAllTasks, formValues];

        //Updating main All Tasks Array
        setAllTasks(newAllTasks);

        //Closing the Edit Task Page
        setShowPages({...showPages, editTaskPage:false, dashboardPage: true});

    }


    return (

        <div>
        <form onSubmit={handleSubmitForm} className={styles.input_form}>

            <div>
                <h2> <FaEdit color='darkorange' size={25} /> Edit Task </h2>
                <br />
                <p>Edit your existing task!</p>
            </div>

            <div className={styles.input_field_div}>
                <label>Task</label>
                <input defaultValue={taskData.task} required className={styles.input_field} type="text" placeholder="Eg: Make Food" />
            </div>

            <div className={styles.input_field_div}>
                <label>Duration (Hours)</label>
                <input defaultValue={taskData.duration} required className={styles.input_field} type="number" step="0.01" min="0" placeholder="Eg: 2" />
            </div>

            <div className={styles.input_field_div_two_divs}>

                <div className={styles.input_field_div}>
                    <label>Deadline (Date)</label>
                    <input defaultValue={taskData.deadline}  required className={styles.input_field} type="date" />
                    <small>Eg: 12/31/2024</small>
                </div>

                <div className={styles.input_field_div}>
                    <label>Priority No.</label>
                    <input defaultValue={taskData.priority}  required className={styles.input_field} type="number" placeholder="Eg: 10" />
                    <small>Higher no. = More priority</small>
                </div>

            </div>

            <div className={styles.input_field_div_two_divs}>

                <div className={styles.input_field_div}>

                    <label>Importance</label>

                    <div className={styles.radio_option_div}>
                        <input required defaultChecked={taskData.impAndUrgNo==1 || taskData.impAndUrgNo==3} type="radio" name="importance" id="imp" />
                        <label className={styles.light_label} htmlFor="imp">Important</label>
                    </div>

                    <div className={styles.radio_option_div}>
                        <input required defaultChecked={taskData.impAndUrgNo==2 || taskData.impAndUrgNo==4} type="radio" name="importance" id="not-imp" />
                        <label className={styles.light_label} htmlFor="not-imp">Not Important</label>
                    </div>
                </div>

                <div className={styles.input_field_div}>
                    <label>Urgency</label>

                    <div className={styles.radio_option_div}>
                        <input required defaultChecked={taskData.impAndUrgNo==1 || taskData.impAndUrgNo==2} type="radio" name="urgency" id="urgent" />
                        <label className={styles.light_label} htmlFor="urgent">Urgent</label>
                    </div>

                    <div className={styles.radio_option_div}>
                        <input required defaultChecked={taskData.impAndUrgNo==3 || taskData.impAndUrgNo==4} type="radio" name="urgency" id="not-urgent" />
                        <label className={styles.light_label} htmlFor="not-urgent">Not Urgent</label>
                    </div>
                </div>

            </div>

            <div className={styles.input_field_div}>
                <label>Type Keywords</label>
                <textarea required className={styles.input_field} id="keywords" name="keywords" rows="4" cols="30" defaultValue={taskData.keywords.join(", ")} placeholder="Enter comma separated keywords."></textarea>
                <small>Enter comma separated keywords</small>
                <br />
            </div>

            <div className={styles.input_field_div_two_divs}>
                <button type='submit' className={styles.button1}>
                    {/* <IoIosAdd /> */}
                    Save (Edit)
                </button>

                <button onClick={handleClose} type='button' className={styles.button2}>
                    Cancel
                </button>
            </div>

        </form>

        </div>

    )

}

export default EditTaskPage;
