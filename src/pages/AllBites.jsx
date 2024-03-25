import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import { Link } from "react-router-dom";
import Favorite from "../components/Favorite";
import ShowcaseBite from "./ShowcaseBite";
import "../index.css";
import { MdTimer } from 'react-icons/md'; 

function AllBites() {
  const [bites, setBites] = useState([]);
  const [search, setSearch] = useState(""); // Set the search state
  const [selectedCategory, setSelectedCategory] = useState("All");

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
              isFavorited: false,
            }))
          );
        } else {
          console.error("Data is not in the expected format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to toggle full description
  const toggleDescription = (id) => {
    setBites((prevBites) =>
      prevBites.map((bite) =>
        bite.id === id
          ? { ...bite, showFullDescription: !bite.showFullDescription }
          : bite
      )
    );
  };

  // Function to toggle favorite status
  const toggleFavorite = (id) => {
    setBites((prevBites) =>
      prevBites.map((bite) =>
        bite.id === id ? { ...bite, isFavorited: !bite.isFavorited } : bite
      )
    );
  };

  // Update the selected category in the state
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Update the search term in the search state
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter the bites based on the search term and selected category
  const filteredBites = bites
    .filter((bite) => bite.strMeal.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (bite) =>
        selectedCategory === "All" || bite.strCategory === selectedCategory
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
      <CategoryFilter
        bites={bites}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="meal-grid">
        {filteredBites.map((bite) => (
          <div key={bite.idMeal} className="meal">
            <img src={bite.strMealThumb} alt={bite.strMeal} />
            <div className="meal-details">
              <h2>{bite.strMeal}</h2>
              <div className="icon-container">
                <MdTimer className="icon" />
                <p>{bite.mealPreparationTime}</p>
              </div>
              <p>Category: {bite.strCategory}</p>
              <p>
                {bite.showFullDescription
                  ? bite.strInstructions
                  : `${bite.strInstructions.slice(0, 100)}...`}
              </p>

              {!bite.showFullDescription && (
                <button onClick={() => toggleDescription(bite.id)}>
                  Read more
                </button>
              )}
              {bite.showFullDescription && (
                <button onClick={() => toggleDescription(bite.id)}>
                  Read less
                </button>
              )}

              <Favorite
                isFavorited={bite.isFavorited}
                toggleFavorite={() => toggleFavorite(bite.id)}
              />

              <button className="delete" onClick={() => deleteBite(bite.id)}>
                Delete
              </button>
              <p>Date: {bite.date}</p>
              <Link to={`/ShowcaseBite/${bite.id}`} element>
                See Full Bite Page
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default AllBites;
