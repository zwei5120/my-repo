// import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import TodoList from "./views/TodoList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />}></Route>
    </Routes>
  );
}

export default App;
