
import { useState, react } from 'react';
import styles from '../CSS/ToDoItem.module.css';

// Lucide Icons
import { Calendar, Clock, AlertCircle, Tag, CheckCircle, Trash2, Pencil, ClipboardList } from 'lucide-react';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';
import DashboardPage from './DashboardPage';


function ToDoItem({ task, viewMode = 'grid' }) {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks, taskToEdit, setTaskToEdit } = useTaskContext();

    // console.log("To Do Item: ", task);

    //Methods: 
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            //Filtering the Task with the given timeStamp
            const newAllTasks = allTasks.filter((task) => task.timeStamp !== id);
            setAllTasks(newAllTasks);
        }
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

    const handleToggleSubTask = (subTaskId) => {
        const updatedTasks = allTasks.map(t => {
            if (t.timeStamp === task.timeStamp) {
                const updatedSubTasks = t.subTasks.map(st =>
                    st.id === subTaskId ? { ...st, completed: !st.completed } : st
                );
                return { ...t, subTasks: updatedSubTasks };
            }
            return t;
        });
        setAllTasks(updatedTasks);
    };

    const handleEditSubTask = (subTaskId) => {
        const newText = prompt("Edit your sub-task");
        if (newText !== null) {
            const updatedTasks = allTasks.map(t => {
                if (t.timeStamp === task.timeStamp) {
                    const updatedSubTasks = t.subTasks.map(st =>
                        st.id === subTaskId ? { ...st, text: newText } : st
                    );
                    return { ...t, subTasks: updatedSubTasks };
                }
                return t;
            });
            setAllTasks(updatedTasks);
        }
    };

    const handleDeleteSubTask = (subTaskId) => {
        const updatedTasks = allTasks.map(t => {
            if (t.timeStamp === task.timeStamp) {
                const updatedSubTasks = t.subTasks.filter(st => st.id !== subTaskId);
                return { ...t, subTasks: updatedSubTasks };
            }
            return t;
        });
        setAllTasks(updatedTasks);
    };

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

    // Get urgency/importance labels
    const getUrgencyLabel = () => {
        if (task.impAndUrgNo === 1) return { urgent: 'Urgent', important: 'Important' };
        if (task.impAndUrgNo === 2) return { urgent: 'Urgent', important: 'Not Important' };
        if (task.impAndUrgNo === 3) return { urgent: 'Not Urgent', important: 'Important' };
        return { urgent: 'Not Urgent', important: 'Not Important' };
    };

    const urgencyLabels = getUrgencyLabel();

    // Table view
    if (viewMode === 'table') {
        return (
            <tr className={`${styles.table_row} ${styles[priorityClass]}`}>
                <td className={styles.table_cell}>
                    <div className={styles.table_task_title}>
                        {task.task.length > 50 ? task.task.substring(0, 50) + "..." : task.task}
                    </div>
                </td>
                <td className={styles.table_cell}>
                    <span className={`${styles.priority_label} ${styles[priorityClass]}`}>
                        {priorityLabel} ({task.priority})
                    </span>
                </td>
                <td className={styles.table_cell}>{task.duration} hrs</td>
                <td className={styles.table_cell}>{formatDate(task.dateString)}</td>
                <td className={`${styles.table_cell} ${styles.deadline}`}>{formatDate(task.deadline)}</td>
                <td className={styles.table_cell}>
                    <span className={task.taskDone ? styles.status_done : styles.status_pending}>
                        {task.taskDone ? 'Done' : 'Pending'}
                    </span>
                </td>
                <td className={styles.table_cell}>
                    <div className={styles.table_actions}>
                        <button onClick={() => { handleMarkAsDone(task.timeStamp) }} className={styles.table_button1} title={task.taskDone ? "Undone" : "Done"}>
                            <CheckCircle />
                        </button>
                        <button onClick={() => { handleEdit(task.timeStamp) }} className={styles.table_button3} title="Edit">
                            <Pencil />
                        </button>
                        <button onClick={() => { handleDelete(task.timeStamp) }} className={styles.table_button2} title="Delete">
                            <Trash2 />
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    // Grid view (default)
    return (
        <div className={styles.task_div}>
            <div className={`${styles.priority_banner} ${styles[priorityClass]}`}></div>
            
            <div className={styles.task_content}>
                <h3>{task.task.length > 65 ? task.task.substring(0, 65) + "..." : task.task}</h3>

                <div className={styles.details_grid}>
                    {/* Priority */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <AlertCircle />
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
                            <Clock />
                            <span>Duration:</span>
                        </div>
                        <span className={styles.detail_value}>{task.duration} hours</span>
                    </div>

                    {/* Date Created */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <Calendar />
                            <span>Date Created:</span>
                        </div>
                        <span className={styles.detail_value}>{formatDate(task.dateString)}</span>
                    </div>

                    {/* Deadline */}
                    <div className={styles.detail_row}>
                        <div className={styles.detail_label}>
                            <Calendar />
                            <span>Deadline:</span>
                        </div>
                        <span className={`${styles.detail_value} ${styles.deadline}`}>{formatDate(task.deadline)}</span>
                    </div>

                    {/* Time taken (if completed) */}
                    {task.taskDone && (
                        <div className={styles.detail_row}>
                            <div className={styles.detail_label}>
                                <Clock />
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
                                <Tag />
                                <span>Keywords:</span>
                            </div>
                            <div className={styles.keywords_div}>
                                {task.keywords.map((keyword, index) => (
                                    <span key={index} className={styles.span_keywords}>{keyword}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sub Tasks */}
                    {task.subTasks && task.subTasks.length > 0 && (
                        <div className={styles.detail_row}>
                            <div className={styles.detail_label}>
                                <ClipboardList />
                                <span>Sub Tasks:</span>
                            </div>
                            <div className={styles.sub_tasks_div}>
                                {task.subTasks.map((subTask) => (
                                    <div key={subTask.id} className={styles.sub_task}>
                                        <input type="checkbox" checked={subTask.completed} onChange={() => handleToggleSubTask(subTask.id)} />
                                        <span style={{ textDecoration: subTask.completed ? 'line-through' : 'none' }}>{subTask.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.buttons_div}>
                    <button onClick={() => { handleMarkAsDone(task.timeStamp) }} className={styles.button1}>
                        <CheckCircle />
                        {task.taskDone ? "Undone" : "Done"}
                    </button>
                    <button onClick={() => { handleDelete(task.timeStamp) }} className={styles.button2}>
                        <Trash2 />
                        Delete
                    </button>
                    <button onClick={() => { handleEdit(task.timeStamp) }} className={styles.button3}>
                        <Pencil />
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ToDoItem;