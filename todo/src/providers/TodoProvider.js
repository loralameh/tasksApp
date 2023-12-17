import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([{ name: "task1", _id: 1 }]);
  const [isloading, setIsloading] = useState(false);

  const fetchTasks = async () => {
    try {
      setIsloading(true);
      const response = await fetch("http://localhost:5000");
      const data = await response.json();
      setTasks(data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TodoContext.Provider value={{ isloading, tasks }}>
      {children}
    </TodoContext.Provider>
  );
}

TodoProvider.propTypes = {
  children: PropTypes.any,
};

export default TodoContext;
