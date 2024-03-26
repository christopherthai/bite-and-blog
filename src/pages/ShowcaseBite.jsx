import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import { Rating } from "react-simple-star-rating";

function ShowcaseBite() {
  const [bite, setBite] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate to go back one page

  useEffect(() => {
    fetch(`http://localhost:4000/meals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBite(data);
        setRating(data.rating);
      })
      .catch((error) => console.error("Error fetching bite", error));
  }, [id]);

  if (!bite) {
    return <div>Loading...</div>;
  }

  // Function to handle rating
  const handleRating = (rate) => {
    setRating(rate);

    fetch(`http://localhost:4000/meals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rating: rate }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRating(data.rating);
      })
      .catch((error) => console.error("Error submitting rating", error));
  };

  const centerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    textAlign: "left",
    minHeight: "100vh",
    padding: "20px",
    maxWidth: "1200px",
    margin: "auto",
  };

  // To handle navigation back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };

  return (
    <div style={centerStyle}>
      <div>
        <img
          src={bite.strMealThumb}
          alt={bite.strMeal}
          style={{ maxWidth: "800px", height: "auto", padding: "20px" }}
        />
      </div>
      <div style={{ padding: "20px" }}>
        <h2>{bite.strMeal}</h2>
        <h5>Category: {bite.strCategory}</h5>
        <h5>Area of Origin: {bite.strArea}</h5>
        <div style={{ width: "65%" }}>
          <p>{bite.strInstructions}</p>
        </div>
        <a href={bite.strYoutube}>Link to YouTube Video</a>
        <p>Date: {bite.date}</p>
        {/* Comments and Rating container */}
        <div>
          <div>
            <Rating initialValue={rating} onClick={handleRating} />
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment"
              style={{ width: "500px", height: "100px" }}
            />
          </div>
          <div className="button-container">
            <button onClick={handleGoBack}>Back</button>
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseBite;