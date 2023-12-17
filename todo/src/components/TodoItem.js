import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoItem.module.css";

const TodoItem = (props) => {
  const { todoItem } = props;

  const deleteTask = async (index) => {
    try {
      await fetch(`http://localhost:5000/${index}`, {
        method: "DELETE",
      });
      // fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className={styles.taskBox}>
      <div className={styles.taskText}>
        <p>{todoItem.task}</p>
      </div>
      <div style={{ marginBlock: "5px" }}>
        <button
          className={styles.deleteButton}
          onClick={() => deleteTask(todoItem._id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  todoItem: PropTypes.object,
};

export default TodoItem;
