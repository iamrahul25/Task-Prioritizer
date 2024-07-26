import {createContext, useContext, useState, useEffect } from "react";

export const TaskContext = createContext({});

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export const TaskContextProvider = ({children}) => {

    //States:
	const [showCreateNewTaskPage, setShowCreateNewTaskPage] = useState(false);
    const [showSearchTaskPage, setShowSearchTaskPage] = useState(false);

    const [showTaskList, setShowTaskList] = useState({
        notCompleted: false,
        completed: false,
        notDoneOnDeadline: false,
    });

    

    const [showEditTaskPage, setShowEditTaskPage] = useState(false);
    const [editTaskData, setEditTaskData] = useState({
        task: "",
        duration: "",
        deadline: "",
        dateOfCompletion: "",
        priority: "",
        important: false,
        urgent: false,
        impAndUrgNo: 4,
        timeStamp: "",
        dateString: "",
        taskDone: false,
    });



    //Array of All Tasks - If present in Local Storage, get it from there else empty array
    const [allTasks, setAllTasks] = useState(() => {
        const savedTasks = localStorage.getItem("allTasks");
        if(savedTasks) {
            return JSON.parse(savedTasks);
        } else {
            return [];
        }
    });

    const [lastSyncTime, setLastSyncTime] = useState(()=>{
        const savedLastSyncTime = localStorage.getItem("lastSyncTime");
        if(savedLastSyncTime){
            return savedLastSyncTime;
        } else {
            
            const currentTimestamp = Date.now();
            return currentTimestamp;
        }
    })

    //Search Task List
    const [searchTaskList, setSearchTaskList] = useState([]);


    //Methods:--------------------------------------------------------
    

    //UseEffect:
    //Every time allTasks array changes, save it to the Local Storage 
    useEffect(() => {
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
    }, [allTasks]);

    useEffect(() => {
        localStorage.setItem("lastSyncTime", lastSyncTime);
    }, [lastSyncTime]);


    //Context API Export
    const value = {

        showCreateNewTaskPage, setShowCreateNewTaskPage,

        showSearchTaskPage, setShowSearchTaskPage,

        allTasks, setAllTasks,

        searchTaskList, setSearchTaskList,

        showEditTaskPage, setShowEditTaskPage,

        editTaskData, setEditTaskData,

        showTaskList, setShowTaskList,

        lastSyncTime, setLastSyncTime,

    };

    return <TaskContext.Provider value={value}> {children} </TaskContext.Provider>;
};