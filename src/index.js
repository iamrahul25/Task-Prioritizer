import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import App2 from './App2';
import { TaskContextProvider } from './Context/ContextAPI';

//Pages
import HomePage from './Components/HomePage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import VerifyEmailPage from './Components/VerifyEmailPage';
import DashboardPage from './Components/DashboardPage';
import AddNewTaskPage from './Components/AddNewTaskPage';
import SearchTaskPage from './Components/SearchTaskPage';
import ToDoItem from './Components/ToDoItem';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <TaskContextProvider>
        {/* <App /> */}
        <App2 />
        {/* <HomePage /> */}
        {/* <LoginPage /> */}
        {/* <SignupPage /> */}
        {/* <ForgotPasswordPage /> */}
        {/* <VerifyEmailPage /> */}
        {/* <DashboardPage /> */}
        {/* <AddNewTaskPage /> */}
        {/* <SearchTaskPage /> */}
        {/* <ToDoItem /> */}


    </TaskContextProvider>

);


