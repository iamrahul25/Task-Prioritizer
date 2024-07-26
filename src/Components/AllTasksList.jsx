import {React} from 'react';
import Task from './Task';
import { computeHeadingLevel } from '@testing-library/react';

function AllTasksList({title, taskArray}) {

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
        console.log("Date String: - - -", dateString);

        taskList = taskArray.filter((item) => {
            return item.taskDone === false && item.deadline < dateString;
        });
    }


    return (
        <div>

            <h2>
                { "Tasks (" + (title) + ") => (" + taskList.length + ")" }
            </h2>

            <div>
                {taskList.map((item, index) => {
                    return (
                        <Task key={index} task={item} title={title} />
                    )
                })}
            </div>
            
        </div>
    )
}

export default AllTasksList;