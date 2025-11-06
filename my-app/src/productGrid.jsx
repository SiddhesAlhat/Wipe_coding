import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductGrid({ cartItems, setCartItems }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAddToCart = (product) => {
    const exists = cartItems.find((item) => item.id === product.id);
    if (!exists) {
      const updated = [...cartItems, product];
      setCartItems(updated);
    }
    navigate("/cart");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Product List</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h4 style={styles.name}>{product.title}</h4>
            <p style={styles.price}>${product.price}</p>
            <button style={styles.button} onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "16px", fontFamily: "sans-serif" },
  title: { textAlign: "center", marginBottom: "16px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "10px",
    textAlign: "center",
  },
  image: { width: "80px", height: "80px", objectFit: "contain" },
  name: { fontSize: "13px", margin: "8px 0" },
  price: { fontWeight: "bold", color: "#333" },
  button: {
    marginTop: "8px",
    padding: "6px 10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ProductGrid;
