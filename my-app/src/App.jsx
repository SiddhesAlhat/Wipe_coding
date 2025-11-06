import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductGrid from "./productGrid";
import CartPage from "./CartPage";
import APii from "./APii";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductGrid cartItems={cartItems} setCartItems={setCartItems} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
