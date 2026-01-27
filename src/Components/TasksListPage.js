
import styles from '../CSS/TaskListPage.module.css';

//Import Components

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';
import ToDoItem from './ToDoItem';


function TaskListPage({title, taskArray, viewMode = 'grid'}) {

    let taskList; 

    if(title === "Not Completed") {
        taskList = taskArray.filter((item) => {
            return item.taskDone === false;
        });

        //Sort the taskList by Priority (Reverse Order)
        taskList.sort((a, b) => {
            return b.priority - a.priority;
        });
        
    }
    else if(title === "Completed") {
        taskList = taskArray.filter((item) => {
            return item.taskDone === true;
        });
    }
    else if(title === "Not Done on Deadline") {

        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        const dateString = year + "-" + month + "-" + day;
        // console.log("Date String: - - -", dateString);

        taskList = taskArray.filter((item) => {
            return item.taskDone === false && item.deadline < dateString;
        });
    }
    else if(title==="Filtered/Search Task"){
        //Only Not Completed Tasks
        taskList = taskArray.filter((item) => {
            return item.taskDone === false;
        });
    }
    else if(title==="All"){ 
        taskList = taskArray;
    }

    return (
        <div className={styles.task_list_page}>
            <div>
                <h2>{title}</h2>
                <div className={styles.header_info}>
                    <span className={styles.count_badge}>{taskList.length}</span>
                    <p className={styles.subtitle}>tasks {title === "Completed" ? "completed" : title === "Not Completed" ? "pending completion" : "found"}</p>
                </div>
            </div>

            {viewMode === 'grid' ? (
                <div className={styles.task_list_container}>
                    {/* Loop through taskList and display each task in a card */}
                    {taskList.map((task, index) => {
                        return (
                            <ToDoItem task={task} key={index} viewMode="grid" />
                        );
                    })}
                </div>
            ) : (
                <div className={styles.table_container}>
                    <table className={styles.task_table}>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Duration</th>
                                <th>Date Created</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskList.map((task, index) => {
                                return (
                                    <ToDoItem task={task} key={index} viewMode="table" />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TaskListPage;