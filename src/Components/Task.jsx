import React from "react";
import "../CSS/Task.css";

//Importing Context API
import { TaskContext, useTaskContext } from "../Context/ContextAPI";

function Task({task, title}) {

    // Context API
    const { 
        allTasks, setAllTasks,
        showEditTaskPage, setShowEditTaskPage,
        editTaskData, setEditTaskData,
    } = useTaskContext();


    // Printing the Task Data
    const taskData = task;
    console.log("Task Data:", taskData);

    // Time Taken to Complete
    let timeTakenToComplete = "";

    // Function to calculate the days between two dates
    function daysBetweenDates(date1, date2) {
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
        const parsedDate1 = new Date(date1);
        const parsedDate2 = new Date(date2);
        const diffDays = Math.round(Math.abs((parsedDate1 - parsedDate2) / oneDay));
        return diffDays;
    }

    if(taskData.dateOfCompletion !== "") {
        const dateOfCompletion = taskData.dateOfCompletion;
        console.log("Date of Completion: ^^^", dateOfCompletion);

        const dateCreated = taskData.dateString;
        console.log("Date Created: ^^^", dateCreated);

        timeTakenToComplete = daysBetweenDates(dateCreated, dateOfCompletion);
    }



    //Methods: 
    const handleDelete = (id) => {
        
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
        if(task.taskDone) {
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

    const handleEdit = (id) => {
            
        //Finding the Task with the given timeStamp
        const task = allTasks.find((task) => task.timeStamp === id);
        console.log("Task to Edit:", task);

        //Setting the Task Data to Edit
        setShowEditTaskPage(true);

        //Setting the Edit Task Data
        setEditTaskData(task);
    }
    
    return (
        <div className="task" style={{border: "2px solid black"}}>
            <p> Task (Name): {taskData.task} </p>
            <p> Date Created: {taskData.dateString} </p>
            <p> TimeStamp: {taskData.timeStamp} </p>
            <p> Duration: {taskData.duration} </p>
            <p> Deadline: {taskData.deadline} </p>
            <p> Priority: {taskData.priority} </p>
            <p> {taskData.importance ? "Important": "Not Important"} </p>
            <p> {taskData.urgency ? "Urgent": "Not Urgent"} </p>
            <p> 
                Keywords: 
                { taskData.keywords.map((keyword, index) => {
                    return <span key={index}> {keyword} </span>
                })} 
            </p>

            {
                title === "Completed" ? <p> Date of Completion: {taskData.dateOfCompletion} </p> : null
            }

            {
                title === "Completed" ? <p> Time Taken to Complete: {timeTakenToComplete} Days </p> : null
            }

            <button onClick={()=>handleMarkAsDone(taskData.timeStamp)}> {taskData.taskDone ? "Mark as UnDone" : "Mark as Done"} </button>
            <button onClick={()=>handleDelete(taskData.timeStamp)}> Delete</button>
            <button onClick={()=>handleEdit(taskData.timeStamp)}> Edit</button>
        </div>
    );
}

export default Task;