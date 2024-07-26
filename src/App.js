import React from 'react';
import './CSS/App.css';

import Task from './Components/Task';
import CreateNewTask from './Components/CreateNewTask';
import SearchTask from './Components/SearchTask';
import EditTask from './Components/EditTask';
import AllTasksList from './Components/AllTasksList';
import AuthPage from './AuthPage';


//Context API
import { TaskContext, useTaskContext } from './Context/ContextAPI';

function App() {

	//Context API
	const {
		showCreateNewTaskPage, setShowCreateNewTaskPage,
		showSearchTaskPage, setShowSearchTaskPage,
		allTasks, setAllTasks,
		showEditTaskPage, setShowEditTaskPage,
		editTaskData, setEditTaskData,
		showTaskList, setShowTaskList,
	} = useTaskContext();


	//Methods:
	const showCreateNewTaskPageMethod = () => {
		setShowCreateNewTaskPage(true);
		setShowSearchTaskPage(false);
	}

	const showSearchTaskPageMethod = () => {
		setShowSearchTaskPage(true);
		setShowCreateNewTaskPage(false);
	}


	const handleShowCompletedTask = () => {
		setShowTaskList({
			notCompleted: false,
			completed: true,
			notDoneOnDeadline: false,
		});
	}

	const handleShowNotCompletedTask = () => {
		setShowTaskList({
			notCompleted: true,
			completed: false,
			notDoneOnDeadline: false,
		});
	}

	const handleShowDeadlineTask = () => {
		setShowTaskList({
			notCompleted: false,
			completed: false,
			notDoneOnDeadline: true,
		});
	}


	return (

		<div className="main-page">
			
			<AuthPage />

			<div className="home-page">

				<div className="heading-div">
					<h2> Task Prioritizer </h2>
				</div>

				{/* Create New Tasks Div */}
				<div className='create-new-tasks-div'>
					<button onClick={showCreateNewTaskPageMethod}> + Create New Task! </button>
					{showCreateNewTaskPage ? <CreateNewTask /> : null}
				</div>


				{/* Search / Filter Tasks */}
				<div className='search-tasks-div'>
					<button onClick={showSearchTaskPageMethod} > ? Search / Filter Tasks! </button>
					{showSearchTaskPage ? <SearchTask /> : null}
				</div>


				{/* Edit Task */}
				<div>
					{showEditTaskPage ? <EditTask data={editTaskData} /> : null}
				</div>



				{/* Show Tasks (Completed, Not Completed, Not Done on Deadline) */}
				<div>

					<button onClick={handleShowCompletedTask} > Show Tasks (Completed) </button> <br />
					<button onClick={handleShowNotCompletedTask}> Show Tasks (Not Completed) </button> <br />
					<button onClick={handleShowDeadlineTask}> Show Tasks (Not Done on Deadline) </button> <br />

				</div>



				{/* All Tasks */}
				<div className='all-tasks-div'>


					{showTaskList.notCompleted ? <AllTasksList title="Not Completed" taskArray={allTasks} /> : null}
					{showTaskList.completed ? <AllTasksList title="Completed" taskArray={allTasks} /> : null}
					{showTaskList.notDoneOnDeadline ? <AllTasksList title="Not Done on Deadline" taskArray={allTasks} /> : null}

				</div>

			</div>

		</div>
	);
}

export default App;
