
import styles from '../CSS/TaskListPage.module.css';

//Import Components

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';
import ToDoItem from './ToDoItem';


function TaskListPage({title, taskArray}) {

    let taskList; 

    if(title === "Not Completed") {
        taskList = taskArray.filter((item) => {
            return item.taskDone === false;
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
    else{
        taskList = taskArray;
    }

    return (
        <div className={styles.task_list_page}>

            <h2>{title} ({taskList.length})</h2>

            <div className={styles.task_list_container}>
                {/* Loop through taskList and display each task in a card */}
                {taskList.map((task, index) => {
                    return (
                        <ToDoItem task={task} key={index} />
                    );
                })}
            </div>
        </div>
    );
}

export default TaskListPage;