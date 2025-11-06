import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function CartPage({ cartItems, setCartItems }) {
  // 🟢 Load cart from localStorage when page opens
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart && JSON.parse(savedCart).length > 0 && cartItems.length === 0) {
      setCartItems(JSON.parse(savedCart));
    }
  }, [setCartItems, cartItems.length]);

  // 🟢 Save to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>
          No items in cart. <Link to="/">Go shopping</Link>
        </p>
      ) : (
        <div style={styles.grid}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.image} alt={item.title} style={styles.image} />
              <div>
                <h4 style={styles.name}>{item.title}</h4>
                <p style={styles.price}>${item.price}</p>
              </div>
              <button style={styles.removeBtn} onClick={() => handleRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🧱 Simple Inline CSS
const styles = {
  container: { padding: "20px", fontFamily: "sans-serif" },
  title: { marginBottom: "16px" },
  grid: {
    display: "grid",
    gap: "12px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "10px",
    gap: "10px",
  },
  image: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
  name: { fontSize: "14px", margin: "4px 0" },
  price: { fontWeight: "bold", color: "#333" },
  removeBtn: {
    marginLeft: "auto",
    background: "red",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default CartPage;
