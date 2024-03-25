import React from "react";
import PropTypes from "prop-types";

function CategoryFilter({ bites, selectedCategory, onCategoryChange }) {
  /*
  Add the prop types for the CategoryFilter component. The component should receive the following props:
  - bites: an array of objects representing the bites.
  - selectedCategory: a string representing the selected category.
  - onCategoryChange: a function that will be called when the selected category changes.
  */

  CategoryFilter.propTypes = {
    bites: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
  };

  const bitesCategoriesSet = new Set(bites.map((bite) => bite.strCategory)); // Create a set of categories
  const bitesCategories = Array.from(bitesCategoriesSet); // Convert the set to an array

  return (
    <select value={selectedCategory} onChange={onCategoryChange}>
      <option value="All">All</option>
      {bitesCategories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
