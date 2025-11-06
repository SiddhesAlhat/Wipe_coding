import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Todo";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
      <>
      <Todo />
      </>
  );
}

export default App;
