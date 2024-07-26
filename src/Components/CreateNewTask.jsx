import React from "react";
import "../CSS/CreateNewTask.css";
import { TaskContext, useTaskContext } from "../Context/ContextAPI";


function CreateNewTask() {

    //Context API
    const {showCreateNewTaskPage, setShowCreateNewTaskPage, 
        showSearchTaskPage, setShowSearchTaskPage,
        allTasks, setAllTasks
    } = useTaskContext();

    //Methods:
    const showCreateNewTaskPageMethod = () => {
        setShowCreateNewTaskPage(false);
        setShowSearchTaskPage(false);
    }

    const submitForm = (e) => {
        e.preventDefault();

        console.log("Form Submitted ! \n");
        
        //Get the values from the form
        const task = e.target[0].value;
        const duration = e.target[1].value;
        const deadline = e.target[2].value;
        const priority = e.target[3].value;

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
        console.log("Keywords:", keywords, "\n");

        //Get current datestring and timestamp 
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const dateString = year + "-" + month + "-" + day;
        const timeStamp = date.getTime();

        const formValues = {taskDone:false, task, duration, deadline, dateOfCompletion: "", priority, importance, urgency, impAndUrgNo, dateString, timeStamp, keywords};
        console.log("Form Values:", formValues, "\n");

        //Inserting Values into the All Tasks Array
        setAllTasks([...allTasks, formValues]);

        console.log("All Tasks:", allTasks, "\n");

        //Close the Create New Task Page
        setShowCreateNewTaskPage(false);
    }


    return (
        <div className="create-new-task-page">

            <p>This is create new task page</p>

            
            <form onSubmit={submitForm} >

                <table>

                    <tbody>
                        <tr>
                            <td> Task (Name): </td>
                            <td> <input type="text" defaultValue="Make Food" /> </td>
                        </tr>

                        <tr>
                            <td>Duration (Hours): </td>
                            <td> <input type="number" defaultValue="2" /> </td>
                        </tr>

                        <tr>
                            <td> Deadline: </td>
                            <td> <input type="date" name="" id="" defaultValue="2024-07-17" /> </td>
                        </tr>

                        <tr>
                            <td>Priority Number</td>
                            <td> <input type="number" defaultValue="10" /> </td>
                        </tr>

                        <tr>
                            <td>Importantance</td>
                            <td> 
                                <input type="radio" name="importance" id="imp" defaultChecked />
                                <label htmlFor="imp">Important</label>

                                <input type="radio" name="importance" id="not-imp" />
                                <label htmlFor="not-imp">Not Important</label>
                            </td>
                        </tr>

                        <tr>
                            <td>Urgency</td>
                            <td> 
                                <input type="radio" name="urgency" id="urgent" defaultChecked />
                                <label htmlFor="urgent">Urgent</label>

                                <input type="radio" name="urgency" id="not-urgent" />
                                <label htmlFor="not-urgent">Not Urgent</label>
                            </td>
                        </tr>

                        <tr>
                            <td>Keywords</td>
                            <td>
                                <textarea id="keywords" name="keywords" rows="4" cols="30" defaultValue={"market, skill, freetime"} placeholder="Enter comma separated keywords."></textarea>
                            </td>
                        </tr>

                    </tbody>

                </table>

                <button type="submit"> Add </button>
                <button onClick={showCreateNewTaskPageMethod}> Cancel </button>

            </form>


            
        </div>
    );
}

export default CreateNewTask;