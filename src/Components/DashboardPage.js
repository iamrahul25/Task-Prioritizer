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
    const { showPages, setShowPages, syncTimeStamp, setSyncTimeStamp, getTimeStringMethod, handleSaveOrUpdateData} = useTaskContext();

    //useState
    const [syncTimeString, setSyncTimeString] = useState("");

    const handleLogout = () => {
        console.log("Log Out Clicked!");
        auth.signOut();
        setShowPages({ ...showPages, dashboardPage: 0, homePage: 1 });
    }

    const handleaddNewTask = () => {
        console.log("Create New Task Clicked!");
        setShowPages({ ...showPages, addNewTaskPage: 1, dashboardPage: 0 });
    }

    //Call Sync Time Every 1 Minute
    useEffect(() => {
        const interval = setInterval(() => {
            if(syncTimeStamp === "") return;
            const timeString = getTimeStringMethod(Date.now(), syncTimeStamp);
            setSyncTimeString(timeString);
        }, 1000);

        return () => clearInterval(interval);
    }, [syncTimeStamp]);


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
                    <span>Show Task (Completed)</span>
                    <span className={styles.span_total}>15 Total</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Task (Not completed)</span>
                    <span className={styles.span_total}>3 Total</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Show Tasks (Deadline miss)</span>
                    <span className={styles.span_total}>8 Total</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <span>Last Sync:</span>
                    <span>{syncTimeString}</span>
                </div>
                <hr />

                <div className={styles.task_types_items}>
                    <button onClick={handleSaveOrUpdateData} className={styles.button4}>Sync Data</button>
                    <button onClick={handleLogout} className={styles.button3}> Log Out </button>
                </div>

            </div>


            <TaskListPage />
            

        </div>



    );
}

export default DashboardPage;