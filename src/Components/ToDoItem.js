
import { useState, react } from 'react';
import styles from '../CSS/ToDoItem.module.css';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';
import DashboardPage from './DashboardPage';


function ToDoItem({ task }) {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks } = useTaskContext();

    //Use State
    const [editTaskData, setEditTaskData] = useState({});


    // console.log("To Do Item: ", task);

    //Methods: 
    const handleDelete = (id) => {

        console.log("Delete Clicked!", id);

        //Filtering the Task with the given timeStamp
        const newAllTasks = allTasks.filter((task) => task.timeStamp !== id);
        setAllTasks(newAllTasks);
    }

    const handleMarkAsDone = (id) => {

        console.log("Mark as Done Clicked!", id);

        //Finding the Task with the given timeStamp
        const task = allTasks.find((task) => task.timeStamp === id);

        //Changing the taskDone value to true
        task.taskDone = !task.taskDone;

        //Add Date of Completion
        if (task.taskDone) {
            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const dateString = year + "-" + month + "-" + day;
            task.dateOfCompletion = dateString;
        }
        else {
            task.dateOfCompletion = "";
        }

        //Filtering the Task with the given timeStamp
        const newAllTasks = allTasks.filter((task) => task.timeStamp !== id);

        //Inserting the new Task
        setAllTasks([...newAllTasks, task]);
    }

    //Handle Edit Task
    const handleEdit = (id) => {

        console.log("Edit Clicked!", id);

        //Finding the Task with the given timeStamp
        const task = allTasks.find((task) => task.timeStamp === id);
        console.log("Task to Edit:", task);

        //Setting the Task Data to Edit
        setShowPages({ ...showPages, dashboardPage: 0, editTaskPage: 1 });

        //Setting the Edit Task Data
        setEditTaskData(task);
    }


    return (

        <div>

            <div className={styles.task_div}>

                <h3> Task (Name): {task.task} </h3>

                <table>

                    <tbody>

                        {/* <tr>
                        <td> <strong> Description: </strong> </td>
                        <td> <span> This is a task created by Rahul. </span> </td>
                    </tr>  */}

                        <tr>
                            <td> <strong> Duration (Hrs): </strong> </td>
                            <td> <span> {task.duration} </span> </td>
                        </tr>

                        <tr>
                            <td> <strong> Date Created: </strong> </td>
                            <td> <span> {task.dateString} </span> </td>
                        </tr>

                        <tr>
                            <td> <strong> Deadline: </strong> </td>
                            <td> <span> {task.deadline} </span> </td>
                        </tr>

                        {/* <tr>
                        <td> <strong>Days Left</strong></td>
                        <td> <span> 7 </span> </td>
                    </tr> */}

                        <tr>
                            <td> <strong> Priority: </strong> </td>
                            <td> <span> {task.priority} </span> </td>
                        </tr>

                        <tr>
                            <td> <strong> Imp or Urgent</strong> </td>
                            <td>
                                <div className={styles.keywords_div}>
                                    <span className={styles.span_important}> Important </span>
                                    <span className={styles.span_urgent}> Urgent </span>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <td> <strong> Keywords: </strong> </td>
                            <td>
                                <div className={styles.keywords_div}>
                                    {task.keywords.map((keyword, index) => {
                                        return (
                                            <span key={index} className={styles.span_keywords}> {keyword} </span>
                                        );
                                    })}
                                </div>
                            </td>
                        </tr>

                    </tbody>

                </table>

                <div className={styles.buttons_div}>
                    <button onClick={() => { handleMarkAsDone(task.timeStamp) }} className={styles.button1}> <i className="fa-solid fa-check"></i> Mark as Done</button>
                    <button onClick={() => { handleDelete(task.timeStamp) }} className={styles.button2}> <i className="fa-solid fa-trash"></i> Delete</button>
                    <button onClick={() => { handleEdit(task.timeStamp) }} className={styles.button3}> <i className="fa-solid fa-pencil"></i> Edit</button>
                </div>

            </div>

            

        </div>

    );
}

export default ToDoItem;