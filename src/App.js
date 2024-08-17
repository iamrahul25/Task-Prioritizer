import React from 'react';

//Context API
import { TaskContext, useTaskContext } from './Context/ContextAPI';

//Import Pages
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import DashboardPage from './Components/DashboardPage';
import AddNewTaskPage from './Components/AddNewTaskPage';
import EditTaskPage from './Components/EditTaskPage';
import ForgotPasswordPage from './Components/ForgotPasswordPage';

function App() {

    //Context API
    const {showPages, setShowPages, taskToEdit, setTaskToEdit} = useTaskContext();

    //Pages to show
    console.log(showPages);

    return (
        <div>
            {showPages.homePage ? <HomePage/> : null}
            {showPages.loginPage ? <LoginPage/> : null}
            {showPages.signupPage ? <SignupPage/> : null}
            {showPages.dashboardPage ? <DashboardPage/> : null}
            {showPages.addNewTaskPage ? <AddNewTaskPage/> : null}
            {showPages.editTaskPage ? <EditTaskPage taskData={taskToEdit} /> : null}
            {showPages.forgotPasswordPage ? <ForgotPasswordPage/> : null}

        </div>
    );
}

export default App;