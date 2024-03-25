import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

function ShowcaseBite() {
    const [bite, setBite] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/meals/${id}`)
            .then(res => res.json())
            .then(data => setBite(data))
            .catch(error=> console.error("Error fetching bite", error));
    }, [id]);

    if(!bite) {
        return <div>Loading...</div>;
    }

    const handleRating = (rate) => {
        setRating(rate);
    }

        const centerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        textAlign: 'left',
        minHeight: '100vh',
        padding: '20px',
        maxWidth: '1200px',
        margin: 'auto'
    };

    return (
        <div style = {centerStyle}>
            <div>
                <img src = {bite.strMealThumb} alt = {bite.strMeal} style={{maxWidth:'800px', height: 'auto', padding: '20px'}}/>
            </div>
            <div style = {{padding: '20px'}}>
                <h2>{bite.strMeal}</h2>
                <h5>Category: {bite.strCategory}</h5>
                <h5>Area of Origin: {bite.strArea}</h5>
                <div style = {{width: '65%'}}>
                    <p>{bite.strInstructions}</p>
                </div>
                <a href = {bite.strYoutube}>Link to YouTube Video</a>
                <p>Date: {bite.date}</p>
                {/* Comments and Rating container */}
                <div >
                    <div>
                        <Rating onClick = {handleRating} />
                    </div>
                    <div>
                        <textarea 
                            value={comment} 
                            onChange={(e) => setComment(e.target.value)} 
                            placeholder="Leave a comment" 
                            style={{ width: '500px', height: '100px' }}
                        />
                    </div>
                    <button >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ShowcaseBite;