import React, { useState } from "react";
import StarRatings from "react-star-ratings";

function MealFeedback({ feedback = [] }) {
  return (
    <div style={{ marginTop: "20px", padding: "20px" }}>
      <h3
        style={{
          marginTop: "0",
          borderBottom: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        User Feedback
      </h3>
      {feedback.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: "0" }}>
          {feedback.map((fb, index) => (
            <li
              key={index}
              style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}
            >
              <div style={{ marginBottom: "5px" }}>
                <span style={{ fontWeight: "bold" }}>{fb.name}</span>
                <span
                  style={{
                    marginLeft: "40px",
                    color: "#757575",
                    fontSize: "0.9em",
                  }}
                >
                  {fb.date}
                </span>
              </div>
              <div style={{ marginBottom: "5px" }}>
                <StarRatings
                  rating={fb.rating}
                  starDimension="30px"
                  starRatedColor="orange"
                  isSelectable={false}
                  className="star-rating"
                />
              </div>
              <p style={{ margin: "0" }}>{fb.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>No comments yet.</p>
      )}
    </div>
  );
}

export default MealFeedback;
