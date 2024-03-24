import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import ShowcaseBite from "./ShowcaseBite";
import "../index.css";

function AllBites() {
  const [bites, setBites] = useState([]);
  const [search, setSearch] = useState(""); // Set the search state

  useEffect(() => {
    fetch("http://localhost:4000/meals")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedMeals = data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
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
        i === index
          ? { ...bite, showFullDescription: !bite.showFullDescription }
          : bite
      )
    );
  };
  
  // Update the search term in the search state
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter the bites based on the search term
  const filteredBites = bites.filter((bite) =>
    bite.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  // Function to delete a bite in the database and update the state
  const deleteBite = (id) => {
    fetch(`http://localhost:4000/meals/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Will be called if the server returns a success
        } else {
          console.error("Error deleting bite post"); // Will be called if the server returns an error
        }
      })
      .then(() => {
        setBites((prevBites) => prevBites.filter((bite) => bite.id !== id));
      })
      .catch((error) => console.error("Error deleting bite:", error));
  };

  return (
    <main className="bites-container">
      <h1>All Bites</h1>
      <Search search={search} onHandleSearch={handleSearch} />
      <div className="meal-grid">
        {filteredBites.map((bite, index) => (
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
                <button onClick={() => toggleDescription(index)}>
                  Read more
                </button>
              )}
              {bite.showFullDescription && (
                <button onClick={() => toggleDescription(index)}>
                  Read less
                </button>
              )}
              
              <button
                className="delete"
                onClick={() => deleteBite(bite.id)}
              >
                Delete
              </button>
              <p>Date: {bite.date}</p>
              <Link to = {`/ShowcaseBite/${bite.id}`} element >See Full Bite Page</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AllBites;
