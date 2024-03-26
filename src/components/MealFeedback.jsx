import React, { useState } from "react";

function MealFeedback({ feedback = [] }) {

  return (
    <div>
      <h3>User Feedback</h3>
      <ul>
        {feedback.map((fb, index) => (
          <li key={index}>{`${fb.name} (${fb.rating}/5): ${fb.comment}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default MealFeedback;
