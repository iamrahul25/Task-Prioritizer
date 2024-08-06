import styles from '../CSS/SearchTaskPage.module.css';
import { useRef, useEffect } from 'react';
import { FaTasks } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import TaskListPage from './TasksListPage';

//Import Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';

function SearchTaskPage() {

    //Context API
    const { showPages, setShowPages, filteredTaskList, setFilteredTaskList, allTasks } = useTaskContext();

    //UseRef for textarea value - Keywords
    const keywordsRef = useRef();

    //Methods:

    const sortByPriority = () => {
        //Sorting the Array by Priority
        const sortedList = [...filteredTaskList].sort((a, b) => a.priority - b.priority).reverse();
        setFilteredTaskList(sortedList);
    }

    const reverseList = () => {
        //Reversing the Array
        const reversedList = [...filteredTaskList].reverse();
        setFilteredTaskList(reversedList);
    }

    const sortByDeadline = () => {
        //Sorting the Array by Deadline
        const sortedList = [...filteredTaskList].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setFilteredTaskList(sortedList);
    }

    const sortByDuration = () => {
        //Sorting the Array by Duration
        const sortedList = [...filteredTaskList].sort((a, b) => a.duration - b.duration);
        setFilteredTaskList(sortedList);
    }

    const sortbyDateCreated = () => {
        //Sorting the Array by Date Created
        const sortedList = [...filteredTaskList].sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
        setFilteredTaskList(sortedList);
    }

    const sortByImpAndUrg = () => {
        //Sorting the Array by Importance and Urgency
        const sortedList = [...filteredTaskList].sort((a, b) => a.impAndUrgNo - b.impAndUrgNo);
        setFilteredTaskList(sortedList);
    }

    const handleSearchButton = () => {

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


    //Rerendering the Component when the filteredTaskList changes
    useEffect(() => {
        setFilteredTaskList(allTasks);
    }, [allTasks]);

    const handleCloseButton = () => {
        // console.log("Cancel Button Clicked!");
        setShowPages({ ...showPages, searchTaskPage: 0, dashboardPage: 1 });
    }


    return (

        <div>

            <div className={styles.input_form}>

                <div>
                    <h2> <FaSearch color='darkorange' size={25} />  Search Task </h2>
                    <br />
                    <p>Search or Filter tasks!</p>
                </div>

                <div className={styles.button_div}>
                    <button onClick={reverseList} className={styles.button}>Reverse the Order</button>
                    <button onClick={sortByDeadline} className={styles.button}>Sort by Deadline</button>
                    <button onClick={sortByPriority} className={styles.button}>Sort by Priority</button>
                    <button onClick={sortByDuration} className={styles.button}>Sort by Duration</button>
                    <button onClick={sortbyDateCreated} className={styles.button}>Sort by Date Created</button>
                    <button onClick={sortByImpAndUrg} className={styles.button}>Sort by Imp & Urg</button>
                </div>

                <div className={styles.input_field_div}>
                    <label>Type Keywords</label>
                    <textarea ref={keywordsRef} className={styles.input_field} placeholder="Eg: todo, food, freetime" rows="3"></textarea>
                    <small>Enter comma separated keywords</small>
                    <br />
                </div>

                <div className={styles.input_field_div_two_divs}>
                    <button onClick={handleSearchButton} className={styles.button1}> Search Task </button>
                    <button onClick={handleCloseButton} className={styles.button2}> Close </button>
                </div>

            </div>

            <div>

                <TaskListPage title={"Filtered Task"} taskArray={filteredTaskList} />


            </div>

        </div>

    );
}

export default SearchTaskPage;