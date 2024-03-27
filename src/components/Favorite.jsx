function Favorite({ id, isFavorited, handleFavoriteBite }) {
  function toggleFavorite() {
    fetch(`http://localhost:4000/meals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isFavorited: !isFavorited }),
    })
      .then((response) => response.json())
      .then((favoritedBite) => {
        // Update the isFavorited state
        handleFavoriteBite(favoritedBite);
      })
      .catch((error) => console.error("Error toggling favorite:", error));
  }

  console.log("isFavorited", isFavorited);

  return (
    <button className="favorite-button" onClick={toggleFavorite}>
      {isFavorited ? "⭐" : "☆"}
    </button>
  );
}

export default Favorite;
