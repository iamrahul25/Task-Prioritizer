import { useRef, useState, useEffect} from "react";
import Task from "./Task";

//Import Context API
import { TaskContext, useTaskContext } from "../Context/ContextAPI";

function SearchTask() {

    const { 
        showSearchTaskPage, setShowSearchTaskPage,
        showCreateNewTaskPage, setShowCreateNewTaskPage,
        allTasks, setAllTasks,
        searchTaskList, setSearchTaskList,
        } = useTaskContext();

    //UseRef for textarea value - Keywords
    const keywordsRef = useRef();


    //Methods:
    const handleClose = () =>{
        setShowSearchTaskPage(false);
        setShowCreateNewTaskPage(false);
    }

    const sortByPriority = () => {
        //Sorting the Array by Priority
        const sortedList = [...searchTaskList].sort((a, b) => a.priority - b.priority).reverse();
        setSearchTaskList(sortedList);
    }

    const reverseList = () => {
        //Reversing the Array
        const reversedList = [...searchTaskList].reverse();
        setSearchTaskList(reversedList);
    }

    const sortByDeadline = () => {
        //Sorting the Array by Deadline
        const sortedList = [...searchTaskList].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        setSearchTaskList(sortedList);
    }

    const sortByDuration = () => {
        //Sorting the Array by Duration
        const sortedList = [...searchTaskList].sort((a, b) => a.duration - b.duration);
        setSearchTaskList(sortedList);
    }

    const sortbyDateCreated = () => {
        //Sorting the Array by Date Created
        const sortedList = [...searchTaskList].sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp));
        setSearchTaskList(sortedList);
    }

    const sortByImpAndUrg = () => {
        //Sorting the Array by Importance and Urgency
        const sortedList = [...searchTaskList].sort((a, b) => a.impAndUrgNo - b.impAndUrgNo);
        setSearchTaskList(sortedList);
    }

    const handleSearch = () => {

        //Getting Keywords in an Array
        const textareaString = keywordsRef.current.value;
        const keywords = textareaString.split(",").map((keyword) => keyword.trim()).filter((keyword) => keyword !== "");
        console.log("Keywords:", keywords, "\n");


        //If all keywords are present in the task, then it will be displayed
        const filteredListAND = allTasks.filter((task) => {
            let flag = true;
            keywords.forEach((keyword) => {
                if(!task.keywords.includes(keyword)){
                    flag = false;
                }
            });

            return flag;
        });

        setSearchTaskList(filteredListAND);

        //If any of the keywords are present in the task, then it will be displayed
        const filteredListOR = allTasks.filter((task) => {
            let flag = false;
            keywords.forEach((keyword) => {
                if(task.keywords.includes(keyword)){
                    flag = true;
                }
            });
            return flag;
        });

    }


    //Rerendering the Component when the searchTaskList changes
    useEffect(() => {
        setSearchTaskList(allTasks);
    }, [allTasks]);


    return (

        <div>

            <div>

                <h2>Search / Filter Task</h2>
                
                <button onClick={reverseList}> Reverse Order </button> <br />
                <button onClick={sortByDeadline}> Sort by Deadline</button> <br />
                <button onClick={sortByPriority}> Sort by Priority</button> <br />
                <button onClick={sortByDuration}> Sort by Duration</button> <br />
                <button onClick={sortbyDateCreated}> Sort by Date</button> <br />
                <button onClick={sortByImpAndUrg}> Sort by Imp & Urg</button> <br />

                <label htmlFor="keywords">Enter Keywords</label> <br />
                <textarea ref={keywordsRef} id="keywords" name="keywords" rows="4" cols="30" placeholder="Enter comma seperated keywords."> </textarea>
                <br />

                
                <button onClick={handleSearch}> Search </button>

                <button onClick={handleClose}>Close</button> 

            </div>

            <div>
                <h2>Search Result ({searchTaskList.length})</h2>

                <div>
                    {
                        searchTaskList.map((task, index) => {
                            return <Task key={index} task={task} />
                        })

                    }
                </div>
            </div>

        </div>
    )
}

export default SearchTask;