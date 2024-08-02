import styles from '../CSS/SearchTaskPage.module.css';
import { FaTasks } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

function SearchTaskPage() {
  return (
    <form className={styles.input_form}>

    <div>
        <h2> <FaSearch color='darkorange' size={25} />  Search Task </h2>
        <br/>
        <p>Search or Filter tasks!</p>
    </div>

    <div className={styles.button_div}>
        <button className={styles.button}>Reverse the Order</button> 
        <button className={styles.button}>Sort by Deadline</button>
        <button className={styles.button}>Sort by Priority</button>
        <button className={styles.button}>Sort by Duration</button>
        <button className={styles.button}>Sort by Date</button>
        <button className={styles.button}>Sort by Imp & Urg</button>
    </div>

    <div className={styles.input_field_div}>
        <label>Type Keywords</label>
        <textarea className={styles.input_field} placeholder="Eg: todo, food, freetime" rows="3"></textarea>
        <small>Enter comma separated keywords</small>
        <br/>
    </div>

    <div className={styles.input_field_div_two_divs}>
        <button className={styles.button1}> 
            Search Task
        </button>

        <button className={styles.button2}> 
            Cancel
        </button>
    </div>
    
</form>

  );
}

export default SearchTaskPage;