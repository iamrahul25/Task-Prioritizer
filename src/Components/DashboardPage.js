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
    const { showPages, setShowPages, allTasks, setAllTasks } = useTaskContext();
    const [taskType, setTaskType] = useState("All Tasks");

    const handleLogout = () => {
        console.log("Log Out Clicked!");
        auth.signOut();
        setShowPages({ ...showPages, dashboardPage: 0, homePage: 1 });
    }

    const handleaddNewTask = () => {
        console.log("Create New Task Clicked!");
        setShowPages({ ...showPages, addNewTaskPage: 1, dashboardPage: 0 });
    }

    const handleShowType = (type) => {
        console.log("Show Type Clicked!");
        setTaskType(type);
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
                    <button className={styles.button2}>
                        Search / Filter Task!
                    </button>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (All)</span>
                    <span onClick={() => handleShowType("All Tasks")} className={styles.span_total}>Show</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (Completed)</span>
                    <span onClick={() => handleShowType("Completed")} className={styles.span_total}>Show</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (Not completed)</span>
                    <span onClick={() => handleShowType("Not Completed")} className={styles.span_total}>Show</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Tasks (Deadline miss)</span>
                    <span onClick={() => handleShowType("Not Done on Deadline")} className={styles.span_total}> Show</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <button className={styles.button4}>Sync Data</button>
                    <button onClick={handleLogout} className={styles.button3}> Log Out </button>
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