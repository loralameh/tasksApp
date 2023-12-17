import React, { useState, useContext } from "react";
import TodoItem from "../components/TodoItem";

import PropTypes from "prop-types";
import TodoContext from "../providers/TodoProvider";
import styles from "./Todo.module.css";

const TodoPage = (props) => {
  const [newTask, setNewTask] = useState("");
  const { tasks, isloading, addTask, deleteAllTasks } = useContext(TodoContext);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <div className={styles.card}>
      {(isloading.add || isloading.get || isloading.delete) && (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}></div>
        </div>
      )}

      <div className={styles.cardHeader}>
        <input
          className={styles.taskInput}
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button
          disabled={isloading.add}
          className={styles.addButton}
          onClick={() => addTask(newTask, setNewTask(""))}
        >
          {isloading.add ? "Adding.." : "Add"}
        </button>
        <button className={styles.clearAll} onClick={() => deleteAllTasks()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="red"
              d="m10 12.6l.7.7l1.6-1.6l1.6 1.6l.8-.7L13 11l1.7-1.6l-.8-.8l-1.6 1.7l-1.6-1.7l-.7.8l1.6 1.6zM1 4h14V3H1zm0 3h14V6H1zm8 2.5V9H1v1h8zM9 13v-1H1v1z"
            />
          </svg>
        </button>
      </div>
      {tasks.map((todoItem) => (
        <TodoItem key={todoItem._id} todoItem={todoItem} />
      ))}
    </div>
  );
};

TodoPage.propTypes = {};

export default TodoPage;
