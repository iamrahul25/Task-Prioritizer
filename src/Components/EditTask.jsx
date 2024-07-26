import {React, useRef} from 'react';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';

function EditTask({data}) {

    //Context API
    const {
        showEditTaskPage, setShowEditTaskPage,
        editTaskData, setEditTaskData,
        allTasks, setAllTasks,
    } = useTaskContext();

    //Task Data
    const taskData = data;

    //Printing the Task Data
    console.log("Edit Task Data:---", taskData);


    //Methods: 
    const handleClose = () => {
        //Closing the Edit Task Page
        setShowEditTaskPage(false);
    }

    const handleSaveTask = (e) => {

        e.preventDefault();
        
        //ID -> timeStamp
        const id = taskData.timeStamp;
        console.log("ID:", id);


        // Saving the Edited Task
        // console.log("Task Saved!");

        //Form Values
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

        //Get current datestring and timestamp
        const dateString = taskData.dateString;
        const timeStamp = taskData.timeStamp;
        const dateOfCompletion = taskData.dateOfCompletion;

        const formValues = {taskDone:false, task, duration, deadline, dateOfCompletion, priority, importance, urgency, impAndUrgNo, dateString, timeStamp, keywords};
        console.log("Form Values:", formValues, "\n");

        //Removing the Old Task
        let newAllTasks = allTasks.filter((task) => task.timeStamp !== id);

        //Inserting the New Task
        newAllTasks = [...newAllTasks, formValues];

        //Updating main All Tasks Array
        setAllTasks(newAllTasks);

        //Updating the Edit Task Data
        setEditTaskData(formValues);

        //Closing the Edit Task Page
        setShowEditTaskPage(false);
    }

    return (
        <div>
            <h2>Edit Task</h2>

            <div>
                
                <form onSubmit={handleSaveTask} >

                    <table>

                        <tbody>

                            {/* <tr>
                                <td> Task ID: </td>
                                <td> {taskData.timeStamp} </td>
                            </tr> */}


                            <tr>
                                <td> Task (Name): </td>
                                <td> <input type="text" defaultValue={taskData.task} /> </td>
                            </tr>

                            <tr>
                                <td>Duration (Hours): </td>
                                <td> <input type="number" defaultValue={taskData.duration} /> </td>
                            </tr>

                            <tr>
                                <td> Deadline: </td>
                                <td> <input type="date" name="" id="" defaultValue={taskData.deadline} /> </td>
                            </tr>

                            <tr>
                                <td>Priority Number</td>
                                <td> <input type="number" defaultValue={taskData.priority} /> </td>
                            </tr>

                            <tr>
                                <td>Importantance</td>
                                <td> 
                                    <input type="radio" name="importance" id="imp" defaultChecked={taskData.impAndUrgNo==1 || taskData.impAndUrgNo==3} />
                                    <label htmlFor="imp">Important</label>

                                    <input type="radio" name="importance" id="not-imp" defaultChecked={taskData.impAndUrgNo==2 || taskData.impAndUrgNo==4} />
                                    <label htmlFor="not-imp">Not Important</label>
                                </td>
                            </tr>

                            <tr>
                                <td>Urgency</td>
                                <td> 
                                    <input type="radio" name="urgency" id="urgent" defaultChecked={taskData.impAndUrgNo==1 || taskData.impAndUrgNo==2} />
                                    <label htmlFor="urgent">Urgent</label>

                                    <input type="radio" name="urgency" id="not-urgent" defaultChecked={taskData.impAndUrgNo==3 || taskData.impAndUrgNo==4} />
                                    <label htmlFor="not-urgent">Not Urgent</label>
                                </td>
                            </tr>

                            <tr>
                                <td>Keywords</td>
                                <td>
                                    <textarea id="keywords" name="keywords" rows="4" cols="30" defaultValue={taskData.keywords.join(", ")} placeholder="Enter comma separated keywords."></textarea>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                    <button type="submit"> Save Edit</button> 
                    <button type="button" onClick={handleClose}> Cancel </button>

                </form>

            </div>
            
        </div>
    )
}

export default EditTask;