
import styles from '../CSS/TaskListPage.module.css';

//Import Components

//Context API
import { TaskContext, useTaskContext } from '../Context/ContextAPI';
import ToDoItem from './ToDoItem';

function TaskListPage() {

    //Context API
    const { showPages, setShowPages, allTasks, setAllTasks } = useTaskContext();


    return (
        <div className={styles.task_list_page}>
            <h1>Task List Page</h1>

            <div>
                {/* Loop through allTasks array and display each task in a card */}
                {allTasks.map((task, index) => {
                    return (
                        <ToDoItem task={task} key={index} />
                    );
                })}
            </div>
        </div>
    );
}

export default TaskListPage;