import React, { useState, useEffect } from "react";
import TodoPage from "./pages/TodoPage";
import { TodoProvider } from "./providers/TodoProvider";
import styles from "./App.module.css";

function App() {
  console.log("styles");
  console.log(styles);
  return (
    <div className={styles.body}>
      <TodoProvider>
        <TodoPage />
      </TodoProvider>
    </div>
  );
}

export default App;
