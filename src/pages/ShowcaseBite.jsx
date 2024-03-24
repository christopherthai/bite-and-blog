import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ShowcaseBite() {
    const [bite, setBite] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/meals/${id}`)
            .then(res => res.json())
            .then(data => setBite(data))
            .catch(error=> console.error("Error fetching bite", error));
    }, [id]);

    if (!bite) {
        return <div>Loading...</div>;
    }

    const centerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        padding: '20px',
    };

    return (
        <div style = {{centerStyle}}>
            <img src = {bite.strMealThumb} alt = {bite.strMeal} />
            <h2>{bite.strMeal}</h2>
            <p>Category: {bite.strCategory}</p>
            <p>{bite.strInstructions}</p>
            <p>Date: {bite.date}</p>
        </div>
    )
}

export default ShowcaseBite;