import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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
        <App />
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


