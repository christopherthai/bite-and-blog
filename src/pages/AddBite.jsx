
import React, { useState, useEffect } from 'react';

function AddBite() {

  
    const [meals, setMeals] = useState([]);
    const [displayImages, setDisplayImages] = useState([]);

    useEffect(() =>{

      fetch('http://localhost:4000/meals/')
      .then((response) => response.json())
      .then((data) => {
        setMeals(data);
        console.log(data);
        //Upon initial render interate thru and append 5 random meal to set displayImages state
        const initialImages = [];
        for (let i = 0; i<5; i++) {
          initialImages.push(data[Math.floor(Math.random() * data.length)]);
        }
        setDisplayImages(initialImages)
      });
    }, []);


    useEffect(() => {
      // Set an interval to cycle through meal images
      const intervalId = setInterval(() => {
        if(meals.length > 0) {
        
          const randomIndexToUpdate = Math.floor(Math.random() * displayImages.length);

          const randomMealImage = meals[Math.floor(Math.random() * meals.length)];

          const updatedImages = [...displayImages];
          updatedImages[randomIndexToUpdate] = randomMealImage;
          setDisplayImages(updatedImages);
        }

      }, 2000); // Change image every 3 seconds
      
          return () => clearInterval(intervalId); // Cleanup interval on component unmount
        }, [meals, displayImages]);
  
        if (meals.length === 0) return <div>Loading images...</div>;
      

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Featured Meals</h1>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {displayImages.map((meal, index) => (
          <img
            key={index}
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{ width: '18%', objectFit: 'cover', maxHeight: '300px' }}
          />
        ))}
      </div>
    </div>
  );
}
export default AddBite;