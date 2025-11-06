import React, { useEffect, useState } from "react";

function APii() {
  const [photos, setPhotos] = useState([]); // to store API data
  const [loading, setLoading] = useState(true); // for loader
  const [error, setError] = useState(null); // for error handling

  // Fetch data from API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPhotos(data.slice(0, 20)); // limit to 20 items
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Photos List</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {photos.map((photo) => (
          <div
            key={photo.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={photo.thumbnailUrl}
              alt={photo.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default APii;
