import React from 'react';

//Context API
import { TaskContext, useTaskContext } from './Context/ContextAPI';

//Import Pages
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import DashboardPage from './Components/DashboardPage';
import AddNewTaskPage from './Components/AddNewTaskPage';

function App2() {

    //Context API
    const {showPages, setShowPages} = useTaskContext();

    //Pages to show
    console.log(showPages);


    return (
        <div>
            {showPages.homePage ? <HomePage/> : null}
            {showPages.loginPage ? <LoginPage/> : null}
            {showPages.signupPage ? <SignupPage/> : null}
            {showPages.dashboardPage ? <DashboardPage/> : null}
            {showPages.addNewTaskPage ? <AddNewTaskPage/> : null}
        </div>
    );
}

export default App2;