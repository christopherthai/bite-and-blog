import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import CategoryFilter from "../components/CategoryFilter";
import { Link } from "react-router-dom";
import Favorite from "../components/Favorite";
import "../index.css";
import { MdTimer } from "react-icons/md";
import SortFilter from "../components/SortFilter";
import AverageRating from "../components/AverageRating";

function FavoriteBites() {
  const [bites, setBites] = useState([]);
  const [search, setSearch] = useState(""); // Set the search state
  const [selectedCategory, setSelectedCategory] = useState("All"); // Set the selected category state
  const [sort, setSort] = useState("Newest"); // Set the sort state

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
  function handleFavoriteBite(favoritedBite) {
    const updatedBites = bites.map((bite) =>
      bite.id === favoritedBite.id ? favoritedBite : bite
    );
    setBites(updatedBites);
  }

  // Update the sort state
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Update the selected category in the state
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Update the search term in the search state
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filter the bites based on the search term, selected category, and favorited status
  const filteredBites = bites
    .filter((bite) => bite.isFavorited) // Filter based on isFavorited
    .filter((bite) => bite.strMeal.toLowerCase().includes(search.toLowerCase()))
    .filter(
      (bite) =>
        selectedCategory === "All" || bite.strCategory === selectedCategory
    );

  // Sort the filtered bites based on the selected sort
  const sortBites = (bites, sort) => {
    switch (sort) {
      case "Newest":
        return bites.sort((a, b) => new Date(b.date) - new Date(a.date));
      case "Oldest":
        return bites.sort((a, b) => new Date(a.date) - new Date(b.date));
      case "Alphabetically":
        return bites.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
      case "Shortest Preparation Time":
        return bites.sort((a, b) => {
          let lowerCaseA = a.mealPreparationTime.toLowerCase().replace("s", ""); // Remove the 's' from the end of the string and convert to lowercase
          let lowerCaseB = b.mealPreparationTime.toLowerCase().replace("s", ""); // Remove the 's' from the end of the string and convert to lowercase
          let aTime;
          let bTime;

          if (lowerCaseA.includes("hour") && lowerCaseB.includes("hour")) {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            return aTime - bTime;
          } else if (lowerCaseA.includes("hour")) {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]);
            return aTime - bTime;
          } else if (lowerCaseB.includes("hour")) {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]);
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            return aTime - bTime;
          } else {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]);
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]);
            return aTime - bTime;
          }
        });
      case "Longest Preparation Time":
        return bites.sort((a, b) => {
          let lowerCaseA = a.mealPreparationTime.toLowerCase().replace("s", ""); // Remove the 's' from the end of the string and convert to lowercase
          let lowerCaseB = b.mealPreparationTime.toLowerCase().replace("s", ""); // Remove the 's' from the end of the string and convert to lowercase
          let aTime;
          let bTime;

          if (lowerCaseA.includes("hour") && lowerCaseB.includes("hour")) {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            return bTime - aTime;
          } else if (lowerCaseA.includes("hour")) {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]);
            return bTime - aTime;
          } else if (lowerCaseB.includes("hour")) {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]);
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]) * 60; // Convert the hour to minutes
            return bTime - aTime;
          } else {
            aTime = parseInt(a.mealPreparationTime.split(" ")[0]);
            bTime = parseInt(b.mealPreparationTime.split(" ")[0]);
            return bTime - aTime;
          }
        });
      default:
        return bites;
    }
  };

  // Sorts the filtered bites based on the specified sort order.
  const sortedBites = sortBites(filteredBites, sort);

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
      <Search search={search} onHandleSearch={handleSearch} />
      <CategoryFilter
        bites={bites}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <SortFilter bites={bites} sort={sort} onSortChange={handleSortChange} />
      <div className="meal-grid">
        {sortedBites.map((bite) => (
          <div key={bite.idMeal} className="meal">
            <img src={bite.strMealThumb} alt={bite.strMeal} />
            <div className="meal-details">
              <h2>{bite.strMeal}</h2>
              <div className="timer-icon-container">
                <MdTimer className="timer-icon" />
                <p>{bite.mealPreparationTime}</p>
              </div>
              <div className="average-rating-icon-container">
                <AverageRating
                  rating={bite.rating}
                  className="average-rating"
                />
              </div>
              <p>Category: {bite.strCategory}</p>
              <p>
                {bite.showFullDescription
                  ? bite.strInstructions
                  : `${bite.strInstructions.slice(0, 100)}...`}
              </p>
              <div className="button-container">
                {!bite.showFullDescription && (
                  <button onClick={() => toggleDescription(bite.id)}>
                    Quick View
                  </button>
                )}
                {bite.showFullDescription && (
                  <button onClick={() => toggleDescription(bite.id)}>
                    Read less
                  </button>
                )}

                <button className="delete" onClick={() => deleteBite(bite.id)}>
                  Delete
                </button>
              </div>
              <Favorite
                id={bite.id}
                isFavorited={bite.isFavorited}
                handleFavoriteBite={handleFavoriteBite}
              />

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

export default FavoriteBites;
