import React, { useEffect, useState } from "react"

function ShowBites() {

    const [bites, setBites] = useState([])

    useEffect (() => {
        fetch("http://localhost:4000/meals")
        .then((response) => response.json())
        .then((data) => {
            const sortedMeals = [...data.meals].sort((a, b) => new Date(b.date) - new Date(a.date));
            setBites(sortedMeals);
        })
        .catch((error) => console.error("error fetching data", error))
    }, [])

    return (
        <main>
            {bites.map((bite) => (
                <div key={bite.idMeal}>
                    <h2>{bite.strMeal}</h2>
                    <p>Category: {bite.strCategory}</p>
                    <p>{bite.strInstructions}</p>
                    <img src={bite.strMealThumb} alt={bite.strMeal} />
                    <p>Date: {bite.date}</p>
                </div>
            ))}
        </main>
    )
}

export default ShowBites