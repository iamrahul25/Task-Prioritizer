import { useState, useEffect, useRef } from 'react';

import styles from '../CSS/DashboardPage.module.css';
import style2 from '../CSS/SearchTaskPage.module.css';

import { FaSearch } from "react-icons/fa";

//Firebase
import { auth } from '../firebase';

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';

//Dashboard Page
import TaskListPage from './TasksListPage';

function DashboardPage() {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks, lengthOfTasks, setLengthOfTasks, filteredTaskList, setFilteredTaskList } = useTaskContext();
    const [taskType, setTaskType] = useState("Not Completed");

    const handleLogout = () => {
        // console.log("Log Out Clicked!");
        auth.signOut();
        setShowPages({ ...showPages, dashboardPage: 0, homePage: 1 });
    }

    const handleaddNewTask = () => {
        // console.log("Create New Task Clicked!");
        setShowPages({ ...showPages, addNewTaskPage: 1, dashboardPage: 0 });
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

    /************* SEARCH or FILTER TASK *************/

    //UseRef for textarea value - Keywords
    const keywordsRef = useRef();

    //Methods:

    const sortByPriority = () => {
        //Set Task Type
        setTaskType("Search");

        //Sorting the Array by Priority
        const sortedList = [...filteredTaskList].sort((a, b) => a.priority - b.priority).reverse();
        setFilteredTaskList(sortedList);
    }

    const reverseList = () => {
        //Set Task Type
        setTaskType("Search");

        //Reversing the Array
        const reversedList = [...filteredTaskList].reverse();
        setFilteredTaskList(reversedList);
    }

    const sortByDeadline = () => {
        //Set Task Type
        setTaskType("Search");

        //Sorting the Array by Deadline
        const sortedList = [...filteredTaskList].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setFilteredTaskList(sortedList);
    }

    const sortByDuration = () => {
        //Set Task Type
        setTaskType("Search");

        //Sorting the Array by Duration
        const sortedList = [...filteredTaskList].sort((a, b) => a.duration - b.duration);
        setFilteredTaskList(sortedList);
    }

    const sortbyDateCreated = () => {
        //Set Task Type
        setTaskType("Search");

        //Sorting the Array by Date Created
        const sortedList = [...filteredTaskList].sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
        setFilteredTaskList(sortedList);
    }

    const sortByImpAndUrg = () => {
        //Set Task Type
        setTaskType("Search");

        //Sorting the Array by Importance and Urgency
        const sortedList = [...filteredTaskList].sort((a, b) => a.impAndUrgNo - b.impAndUrgNo);
        setFilteredTaskList(sortedList);
    }

    const handleSearchButton = () => {

        //Changing Task Type
        setTaskType("Search");

        //Getting Keywords in an Array
        const textareaString = keywordsRef.current.value;
        const keywords = textareaString.split(",").map((keyword) => keyword.trim()).filter((keyword) => keyword !== "");
        // console.log("Keywords:", keywords, "\n");


        //If all keywords are present in the task, then it will be displayed
        const filteredListAND = allTasks.filter((task) => {
            let flag = true;
            keywords.forEach((keyword) => {
                if (!task.keywords.includes(keyword)) {
                    flag = false;
                }
            });

            return flag;
        });

        setFilteredTaskList(filteredListAND);

        //If any of the keywords are present in the task, then it will be displayed
        const filteredListOR = allTasks.filter((task) => {
            let flag = false;
            keywords.forEach((keyword) => {
                if (task.keywords.includes(keyword)) {
                    flag = true;
                }
            });
            return flag;
        });

    }

    //Whenever allTasks array changes Filtered Task List will also change! 
    useEffect(() => {
        setFilteredTaskList(allTasks);
    }, [allTasks]);
    

    const handleResetButton = () => {
        setTaskType("Search");
    }
    /**************************/

    return (

        <div>

            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <div style={{ maxWidth: "720px", display: "flex", gap: "20px" }} >

                    <div className={styles.dashboard_page_div}>

                        <h1>Task Prioritizer</h1>
                        <br />

                        <div className={styles.task_types_items}>
                            <button onClick={handleaddNewTask} className={styles.button1}> Create New Task! </button>
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

                    <div className={style2.input_form}>

                        <div>
                            <h2> <FaSearch color='darkorange' size={25} />  Search Task </h2>
                            <br />
                            <p>Search or Filter tasks!</p>
                        </div>

                        <div className={style2.button_div}>
                            <button onClick={reverseList} className={style2.button}>Reverse the Order</button>
                            <button onClick={sortByDeadline} style={{backgroundColor:"#E23E3B", color:"white"}} className={style2.button}>Sort by Deadline</button>
                            <button onClick={sortByPriority} className={style2.button}>Sort by Priority</button>
                            <button onClick={sortByDuration} className={style2.button}>Sort by Duration</button>
                            <button onClick={sortbyDateCreated} className={style2.button}>Sort by Date Created</button>
                            <button onClick={sortByImpAndUrg} className={style2.button}>Sort by Imp & Urg</button>
                        </div>

                        <div className={style2.input_field_div}>
                            <label>Type Keywords</label>
                            <textarea ref={keywordsRef} className={style2.input_field} placeholder="Eg: todo, food, freetime" rows="3"></textarea>
                            <small>Enter comma separated keywords</small>
                            <br />
                        </div>

                        <div className={style2.input_field_div_two_divs}>
                            <button onClick={handleSearchButton} className={style2.button1}> Search Task </button>
                            <button onClick={handleResetButton} className={style2.button2}> Reset Search </button>
                        </div>

                    </div>

                </div>

            </div>


            <div>
                {(taskType === "All Tasks") ? <TaskListPage title="All" taskArray={allTasks} /> : null}
                {(taskType === "Completed") ? <TaskListPage title="Completed" taskArray={allTasks} /> : null}
                {(taskType === "Not Completed") ? <TaskListPage title="Not Completed" taskArray={allTasks} /> : null}
                {(taskType === "Not Done on Deadline") ? <TaskListPage title="Not Done on Deadline" taskArray={allTasks} /> : null}
                {(taskType === "Search") ? <TaskListPage title={"Filtered/Search Task"} taskArray={filteredTaskList} /> : null}
            </div>


        </div>



    );
}

export default DashboardPage;