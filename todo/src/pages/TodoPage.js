import React, { useState, useContext } from "react";
import TodoItem from "../components/TodoItem";

import PropTypes from "prop-types";
import TodoContext from "../providers/TodoProvider";
import styles from "./Todo.module.css";

const TodoPage = (props) => {
  const [newTask, setNewTask] = useState("");
  const { tasks, isloading } = useContext(TodoContext);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        await fetch("http://localhost:5000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        });
        fetchTasks();
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <input
          className={styles.taskInput}
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button className={styles.addButton} onClick={addTask}>
          Add
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
