import React, { useEffect, useState } from "react";
import "../index.css"

function AllBites() {
  const [bites, setBites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/meals")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedMeals = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setBites(
            sortedMeals.map((meal) => ({
              ...meal,
              showFullDescription: false,
            }))
          );
        } else {
          console.error("Data is not in the expected format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to toggle full description
  const toggleDescription = (index) => {
    setBites((prevBites) =>
      prevBites.map((bite, i) =>
        i === index ? { ...bite, showFullDescription: !bite.showFullDescription } : bite
      )
    );
  };

  return (
    <main className="bites-container">
      <h1>All Bites</h1>
      <div className="meal-grid">
        {bites.map((bite, index) => (
          <div key={bite.idMeal} className="meal">
            <img src={bite.strMealThumb} alt={bite.strMeal} />
            <div className="meal-details">
              <h2>{bite.strMeal}</h2>
              <p>Category: {bite.strCategory}</p>
              <p>
                {bite.showFullDescription
                  ? bite.strInstructions
                  : `${bite.strInstructions.slice(0, 100)}...`}
              </p>
              {!bite.showFullDescription && (
                <button onClick={() => toggleDescription(index)}>Read more</button>
              )}
              {bite.showFullDescription && (
                <button onClick={() => toggleDescription(index)}>Read less</button>
              )}
              <p>Date: {bite.date}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AllBites;