import React, { useState, useContext } from "react";
import TodoItem from "../components/TodoItem";

import PropTypes from "prop-types";
import TodoContext from "../providers/TodoProvider";
import styles from "./Todo.module.css";

const TodoPage = (props) => {
  const [newTask, setNewTask] = useState("");
  const { tasks, isloading, addTask } = useContext(TodoContext);

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
      </div>
      {tasks.map((todoItem) => (
        <TodoItem key={todoItem._id} todoItem={todoItem} />
      ))}
    </div>
  );
};

TodoPage.propTypes = {};

export default TodoPage;
