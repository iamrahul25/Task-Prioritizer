
import { useState, react } from 'react';
import styles from '../CSS/ToDoItem.module.css';

//React Icons
import { FaCalendarAlt, FaClock, FaExclamationCircle, FaTag, FaCheckCircle, FaTrash, FaEdit } from 'react-icons/fa';

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

    // Get priority class
    const getPriorityClass = (priority) => {
        if (priority >= 1000) return 'critical';
        if (priority >= 500) return 'high';
        if (priority >= 100) return 'medium';
        return 'low';
    };

    // Get priority label
    const getPriorityLabel = (priority) => {
        if (priority >= 1000) return 'Critical';
        if (priority >= 500) return 'High';
        if (priority >= 100) return 'Medium';
        return 'Low';
    };


    const priorityClass = getPriorityClass(task.priority);
    const priorityLabel = getPriorityLabel(task.priority);

    return (
        <div className={styles.task_div}>
            <div className={`${styles.priority_banner} ${styles[priorityClass]}`}></div>
            
            <div className={styles.task_content}>
                <h3>{task.task.length > 65 ? task.task.substring(0, 65) + "..." : task.task}</h3>

                <div className={styles.details_grid}>
                    {/* Priority */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <FaExclamationCircle />
                            <span>Priority:</span>
                        </div>
                        <div className={styles.priority_badge}>
                            <span className={`${styles.priority_label} ${styles[priorityClass]}`}>
                                {priorityLabel}
                            </span>
                            <span className={styles.priority_number}>({task.priority})</span>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <FaClock />
                            <span>Duration:</span>
                        </div>
                        <span className={styles.detail_value}>{task.duration} hours</span>
                    </div>

                    {/* Date Created */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <FaCalendarAlt />
                            <span>Date Created:</span>
                        </div>
                        <span className={styles.detail_value}>{formatDate(task.dateString)}</span>
                    </div>

                    {/* Deadline */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <FaCalendarAlt />
                            <span>Deadline:</span>
                        </div>
                        <span className={`${styles.detail_value} ${styles.deadline}`}>{formatDate(task.deadline)}</span>
                    </div>

                    {/* Time taken (if completed) */}
                    {task.taskDone && (
                        <div className={styles.detail_row}>
                            <div className={styles.detail_label}>
                                <FaClock />
                                <span>Time taken:</span>
                            </div>
                            <span className={styles.detail_value}>{calculateDaysBetween(task.dateString, task.dateOfCompletion)} Days</span>
                        </div>
                    )}

                    {/* Importance/Urgency */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <span>Imp or Urgent:</span>
                        </div>
                        <div className={styles.keywords_div}>
                            {task.impAndUrgNo === 1 && (
                                <>
                                    <span className={styles.span_urgent}>Urgent</span>
                                    <span className={styles.span_important}>Important</span>
                                </>
                            )}
                            {task.impAndUrgNo === 2 && (
                                <>
                                    <span className={styles.span_urgent}>Urgent</span>
                                    <span className={styles.span_not_important}>Not Important</span>
                                </>
                            )}
                            {task.impAndUrgNo === 3 && (
                                <>
                                    <span className={styles.span_not_urgent}>Not Urgent</span>
                                    <span className={styles.span_important}>Important</span>
                                </>
                            )}
                            {task.impAndUrgNo === 4 && (
                                <>
                                    <span className={styles.span_not_urgent}>Not Urgent</span>
                                    <span className={styles.span_not_important}>Not Important</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Keywords */}
                    {task.keywords && task.keywords.length > 0 && (
                        <div className={styles.detail_row}>
                            <div className={styles.detail_label}>
                                <FaTag />
                                <span>Keywords:</span>
                            </div>
                            <div className={styles.keywords_div}>
                                {task.keywords.map((keyword, index) => (
                                    <span key={index} className={styles.span_keywords}>{keyword}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.buttons_div}>
                    <button onClick={() => { handleMarkAsDone(task.timeStamp) }} className={styles.button1}>
                        <FaCheckCircle />
                        {task.taskDone ? "Undone" : "Done"}
                    </button>
                    <button onClick={() => { handleDelete(task.timeStamp) }} className={styles.button2}>
                        <FaTrash />
                        Delete
                    </button>
                    <button onClick={() => { handleEdit(task.timeStamp) }} className={styles.button3}>
                        <FaEdit />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ToDoItem;