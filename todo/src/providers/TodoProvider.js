import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isloading, setIsloading] = useState({ add: false, delete: false });

  const fetchTasks = async () => {
    try {
      setIsloading((prev) => {
        return { ...prev, get: true };
      });
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setTasks(data);
      setIsloading((prev) => {
        return { ...prev, get: false };
      });
    } catch (error) {
      setIsloading((prev) => {
        return { ...prev, get: false };
      });
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (newTask, callBack) => {
    if (newTask.trim() !== "") {
      try {
        setIsloading((prev) => {
          return { ...prev, add: true };
        });
        await fetch("http://localhost:5000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: newTask }),
        });
        fetchTasks();
        callBack();
        setIsloading((prev) => {
          return { ...prev, add: false };
        });
      } catch (error) {
        setIsloading((prev) => {
          return { ...prev, add: false };
        });

        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      setIsloading((prev) => {
        return { ...prev, delete: true };
      });

      await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      fetchTasks();
      setIsloading((prev) => {
        return { ...prev, delete: false };
      });
    } catch (error) {
      setIsloading((prev) => {
        return { ...prev, delete: false };
      });

      console.error("Error deleting task:", error);
    }
  };
  const deleteAllTasks = async () => {
    try {
      setIsloading((prev) => {
        return { ...prev, delete: true };
      });

      await fetch(`http://localhost:5000`, {
        method: "DELETE",
      });
      setTasks([]);
      setIsloading((prev) => {
        return { ...prev, delete: false };
      });
    } catch (error) {
      setIsloading((prev) => {
        return { ...prev, delete: false };
      });

      console.error("Error deleting task:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TodoContext.Provider
      value={{ isloading, tasks, deleteTask, addTask, deleteAllTasks }}
    >
      {children}
    </TodoContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.any,
};

export default TodoContext;
