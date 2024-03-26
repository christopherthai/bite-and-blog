import React, { useState, useEffect } from "react";
import "../index.css";
import sharedmeal from "../images/sharedmeal.jpeg";
import cookingathome from "../images/cookingathome.jpeg";
import cooking from "../images/cooking.jpg.webp";
import dinnerwithfriends from "../images/dinnerwithfriends.webp";

function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex]); // Added currentImageIndex as a dependency

  const images = [sharedmeal, cookingathome, dinnerwithfriends, cooking];

  return (
    <>
      <main className="wrapper">
        <h1> Why Bite and Blog? </h1>
        <p className="about-text">
          You don't need your own food blog to be a food blogger! Cooking, by
          nature, is a social act. Sharing meals or recipes with loved ones is a
          fundamental part of being human. Bite and Blog is here so we can all
          share our favorite dishes, recipes or tips with each other - what made
          those biscuits so fluffy? We need to know! Feel free to share your
          dishes from your favorite restaurant, recipes from your kitchen at
          home and beyond. Life is cheddar when shared with you!
        </p>
        <div className="image-container-about">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className={index === currentImageIndex ? "visible" : "hidden"}
            />
          ))}
        </div>
      </main>
    </>
  );
}

export default About;