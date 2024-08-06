import { useState, useEffect } from 'react';
import styles from '../CSS/DashboardPage.module.css';

//Firebase
import { auth } from '../firebase';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';

//Dashboard Page
import TaskListPage from './TasksListPage';

function DashboardPage() {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks, lengthOfTasks, setLengthOfTasks} = useTaskContext();
    const [taskType, setTaskType] = useState("All Tasks");

    const handleLogout = () => {
        // console.log("Log Out Clicked!");
        auth.signOut();
        setShowPages({ ...showPages, dashboardPage: 0, homePage: 1 });
    }

    const handleaddNewTask = () => {
        // console.log("Create New Task Clicked!");
        setShowPages({ ...showPages, addNewTaskPage: 1, dashboardPage: 0 });
    }

    const handleSearchTasks = () => {
        // console.log("Search Task Clicked!");
        setShowPages({ ...showPages, searchTaskPage: 1, dashboardPage: 0 });
    }

    const handleShowType = (type) => {
        // console.log("Show Type Clicked!");
        setTaskType(type);
    }

    const handleDownloadJSON = () => {
        // console.log("Download JSON Clicked!");

        const data = JSON.stringify(allTasks);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tasks.json';
        a.click();
    }


    return (

        <div>
            <div className={styles.dashboard_page_div}>

                <h1>Task Prioritizer</h1>
                <br />

                <div className={styles.task_types_items}>
                    <button onClick={handleaddNewTask} className={styles.button1}> Create New Task! </button>
                </div>

                <hr />

                <div className={styles.task_types_items}>
                    <button onClick={handleSearchTasks}  className={styles.button2}> Search / Filter Task! </button>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (All)</span>
                    <span onClick={() => handleShowType("All Tasks")} className={styles.span_total}>Show ({lengthOfTasks.all})</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (Completed)</span>
                    <span onClick={() => handleShowType("Completed")} className={styles.span_total}>Show ({lengthOfTasks.completed})</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (Not completed)</span>
                    <span onClick={() => handleShowType("Not Completed")} className={styles.span_total}>Show ({lengthOfTasks.not_completed})</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Tasks (Deadline miss)</span>
                    <span onClick={() => handleShowType("Not Done on Deadline")} className={styles.span_total}> Show ({lengthOfTasks.deadline_miss})</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <button onClick={handleLogout} className={styles.button3}> Log Out </button>
                    <button onClick={handleDownloadJSON} className={styles.button4}>Download JSON</button>
                </div>

            </div>


            <div>
                {(taskType === "All Tasks") ? <TaskListPage title="All" taskArray={allTasks} /> : null}
                {(taskType === "Completed") ? <TaskListPage title="Completed" taskArray={allTasks} /> : null}
                {(taskType === "Not Completed") ? <TaskListPage title="Not Completed" taskArray={allTasks} /> : null}
                {(taskType === "Not Done on Deadline") ? <TaskListPage title="Not Done on Deadline" taskArray={allTasks} /> : null}
            </div>


        </div>



    );
}

export default DashboardPage;