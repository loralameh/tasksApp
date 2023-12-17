import React, { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";

function App() {
  const [tasks, setTasks] = useState([{ name: "task1", _id: 1 }]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000");
      console.log(response);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

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

  console.log(tasks);
  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((todoItem) => (
          <TodoItem key={todoItem._id} todoItem={todoItem} />
        ))}
      </ul>
    </div>
  );
}

export default App;
