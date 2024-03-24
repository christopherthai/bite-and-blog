import React, { useState } from "react";

function Favorite({ isFavorited, toggleFavorite }) {
  return (
    <button onClick={toggleFavorite}>
      {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}

export default Favorite;
