import React from "react";
import PropTypes from "prop-types";

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
    <li>
      {todoItem.task}
      <button onClick={() => deleteTask(todoItem._id)}>Delete</button>
    </li>
  );
};

TodoItem.propTypes = {
  todoItem: PropTypes.object,
};

export default TodoItem;
