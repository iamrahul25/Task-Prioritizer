
import { useState, react } from 'react';
import styles from '../CSS/ToDoItem.module.css';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';
import DashboardPage from './DashboardPage';


function ToDoItem({ task }) {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks, taskToEdit, setTaskToEdit } = useTaskContext();

    // console.log("To Do Item: ", task);

    //Methods: 
    const handleDelete = (id) => {

        // console.log("Delete Clicked!", id);

        //Filtering the Task with the given timeStamp
        const newAllTasks = allTasks.filter((task) => task.timeStamp !== id);
        setAllTasks(newAllTasks);
    }

    const handleMarkAsDone = (id) => {

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

        //Finding the Task with the given timeStamp
        const task = allTasks.find((task) => task.timeStamp === id);
        // console.log("Task to Edit:", task);

        //Setting the Task Data to Edit
        setShowPages({ ...showPages, dashboardPage: 0, editTaskPage: 1 });

        //Setting the Task to Edit
        setTaskToEdit(task);
    }

    //Method to convert: Input: "2024-08-06" to Output: "6 Aug 2024"
    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    //Method to calculate the days between two dates dateOfCreation:2024-08-01 and dateOfCompletion:2024-08-06 => 5 Days
    function calculateDaysBetween(d1, d2) {
        // Convert the date strings to Date objects
        const date1 = new Date(d1);
        const date2 = new Date(d2);

        // Calculate the time difference in milliseconds
        const timeDifference = date2.getTime() - date1.getTime();

        // Convert time difference from milliseconds to days
        const daysDifference = timeDifference / (1000 * 3600 * 24);

        return daysDifference;
    }


    return (

        <div>

            <div className={styles.task_div}>

                <h3> {task.task.length > 65 ? task.task.substring(0, 65) + "..." : task.task} </h3>

                <table>

                    <tbody>

                        {/* <tr>
                        <td> <strong> Description: </strong> </td>
                        <td> <span> This is a task created by Rahul. </span> </td>
                    </tr>  */}

                        <tr>
                            <td> <strong> Priority: </strong> </td>
                            <td> <span> {task.priority} </span> </td>
                        </tr>

                        <tr>
                            <td> <strong> Duration: </strong> </td>
                            <td> <span> {task.duration} hours </span> </td>
                        </tr>

                        <tr>
                            <td> <strong> Date Created: </strong> </td>
                            <td> <span> {formatDate(task.dateString)} </span> </td>
                        </tr>

                        <tr>
                            <td> <strong> Deadline: </strong> </td>
                            <td> <span> {formatDate(task.deadline)} </span> </td>
                        </tr>

                        {task.taskDone ?
                            <tr>
                                <td> <strong>Time taken</strong></td>
                                <td> <span> {calculateDaysBetween(task.dateString, task.dateOfCompletion)} Days</span> </td>
                            </tr>

                            : null}

                        <tr>
                            <td> <strong> Imp or Urgent</strong> </td>
                            <td>
                                <div className={styles.keywords_div}>

                                    {task.impAndUrgNo === 1 && <> <span className={styles.span_urgent}> Urgent </span> <span className={styles.span_important}> Important </span> </>}

                                    {task.impAndUrgNo === 2 && <> <span className={styles.span_urgent}> Urgent </span> <span className={styles.span_not_important}> Not Important </span> </>}

                                    {task.impAndUrgNo === 3 && <> <span className={styles.span_not_urgent}> Not Urgent </span> <span className={styles.span_important}> Important </span> </>}

                                    {task.impAndUrgNo === 4 && <> <span className={styles.span_not_urgent}> Not Urgent </span> <span className={styles.span_not_important}> Not Important </span> </>}

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
                    <button onClick={() => { handleMarkAsDone(task.timeStamp) }} className={styles.button1}> {task.taskDone ? "Undone" : "Done"} </button>
                    <button onClick={() => { handleDelete(task.timeStamp) }} className={styles.button2}> Delete</button>
                    <button onClick={() => { handleEdit(task.timeStamp) }} className={styles.button3}> Edit</button>
                </div>

            </div>



        </div>

    );
}

export default ToDoItem;