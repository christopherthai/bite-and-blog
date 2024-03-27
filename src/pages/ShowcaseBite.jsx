import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import StarRatings from "react-star-ratings";
import MealFeedback from "../components/MealFeedback";

function ShowcaseBite() {
  const [bite, setBite] = useState([]);
  const [rating, setRating] = useState(""); // Use rating state to store the rating value
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [feedback, setFeedback] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate to go back one page

  //Initial fetch and render
  useEffect(() => {
    fetch(`http://localhost:4000/meals/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBite(data);
        setRating(data.rating);
        setFeedback(data.userFeedback);
      })
      .catch((error) => console.error("Error fetching bite", error));
  }, [id]);

  if (!bite) {
    return <div>Loading...</div>;
  }

  /**
   * Handles the rating of a bite.
   * @param {number} rate - The rating value.
   */
  const handleRating = (rate) => {
    setRating(rate);
  };

  // To handle navigation back to the previous page
  const handleGoBack = () => {
    navigate(-1); // Use navigate(-1) to go back
  };

  //Handles click of submit button for user feedback.
  const handleClick = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toISOString().split("T")[0];
    const newFeedback = { name, date, rating: rating || "", comment };
    const updatedFeedback = [...(feedback || []), newFeedback];

    fetch(`http://localhost:4000/meals/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userFeedback: updatedFeedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFeedback(updatedFeedback);
        setBite(data);
        setName("");
        setRating("");
        setComment("");
      })
      .catch((error) => console.error("Error submitting feedback:", error));
  };

  // Calculate the average rating of the bite using reduce method
  const averageRating =
    bite && bite.userFeedback && bite.userFeedback.length > 0
      ? bite.userFeedback.reduce((acc, curr) => acc + curr.rating, 0) /
        bite.userFeedback.length
      : 0;

  const centerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    textAlign: "left",
    minHeight: "100vh",
    padding: "10px",
    gap: "10px",
    maxWidth: "1600px",
    marginBottom: "0",
  };

  const imageStyle = {
    maxWidth: "800px",
    width: "100%",
    height: "auto",
    padding: "10px",
    flex: "1 1 200px",
    marginBottom: "0",
  };

  const contentStyle = {
    padding: "20px",
    flex: "3 1 800px",
    display: "flex",
    flexDirection: "column",
  };

  const instructionsStyle = {
    maxWidth: "125%",
    marginBottom: "20px",
  };

  const textAreaStyle = {
    display: "flex",
    flexDirection: "column",
    width: "500px",
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "500px",
  };

  return (
    <div style={{ maxWidth: "1600px", margin: "auto" }}>
      <div style={centerStyle}>
        <div style={imageStyle}>
          <img
            src={bite.strMealThumb}
            alt={bite.strMeal}
            style={{ maxWidth: "800px", height: "auto", padding: "20px" }}
          />
          <MealFeedback feedback={feedback} />
        </div>
        <div style={contentStyle}>
          <h2>{bite.strMeal}</h2>
          <div className="star-rating-container">
            <StarRatings
              rating={averageRating}
              starDimension="30px"
              starRatedColor="orange"
              isSelectable={false}
              className="star-rating"
            />
          </div>
          <hr className="line" />
          <h5>Category: {bite.strCategory}</h5>
          <h5>Area of Origin: {bite.strArea}</h5>
          <div style={instructionsStyle}>
            <p>{bite.strInstructions}</p>
          </div>
          <div>
            <a href={bite.strYoutube}>Link to YouTube Video</a>
            <p>Date: {bite.date}</p>
            {/* Comments and Rating container */}
            <div style={textAreaStyle}>
              <div>
                <Rating initialValue={rating} onClick={handleRating} />
              </div>
              <div>
                <textarea
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Posters Name"
                  style={{ width: "500px", height: "20gpx" }}
                />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Leave a comment"
                  style={{ width: "500px", height: "100px" }}
                />
              </div>
              <div style={buttonStyle} className="button-container">
                <button onClick={handleGoBack}>Back</button>
                <button onClick={handleClick}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseBite;
