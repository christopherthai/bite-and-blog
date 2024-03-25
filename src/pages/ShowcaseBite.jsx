import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StarRatings } from 'react-star-ratings';

function ShowcaseBite() {
    const [bite, setBite] = useState(null);
    //const [newRating, setNewRating] = useState(0);
    //const [averageRating, setAverageRating] = useState(null)
    const [comment, setComment] = useState('');
    const {id} = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/meals/${id}`)
            .then(res => res.json())
            .then(data => {
                setBite(data);

                const avgRating = data.rating && data.rating.length > 0 ? data.rating.reduce((acc, item) => acc + item, 0)/data.rating.length : 0;
                console.log(avgRating)
                //setAverageRating(avgRating);
            })
            .catch(error=> console.error("Error fetching bite", error));
    }, [id]);

    if(!bite) {
        return <div>Loading...</div>;
    }

   // const handleRating = (rating) => {
   //     setNewRating(rating);
   // }

    const handleSubmit = () => {
        //const updateRating = Array.isArray(bite.rating) ? [...bite.rating, newRating] : [newRating]
        const updateComment = Array.isArray(bite.comment) ? [...bite.comment, comment] : [comment]

        //console.log(updateRating)
        console.log(updateComment)

        const updateBite = {
            //rating: updateRating,
            comment: updateComment
        }
        
        fetch(`http://localhost:4000/meals/${id}`, {
            method:'PATCH',
            headers: {
              'Content-Type':'application/json',
            },
            body: JSON.stringify(updateBite),
        })
            .then(res=>res.json())
            .then(data => setBite(data))

            .catch(error=> console.log('Error updating', error));
            setComment('')
        
    }

    const outerContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    };
             
        const imageAndDescriptionStyle = {
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

        // Style for comments section to take full width
    const commentsContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '20px 0', // Adds padding on top and bottom
    };

        console.log(bite.comment)
        
    return (
        <div style = {outerContainerStyle}>
            <div style = {imageAndDescriptionStyle}>
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
                        {/*<div>
                            <StarRatings onClick = {handleRating} />
                        </div>*/}
                        <div>
                            <textarea 
                                value={comment} 
                                onChange={(e) => setComment(e.target.value)} 
                                placeholder="Leave a comment" 
                                style={{ width: '500px', height: '100px' }}
                            />
                        </div>
                        <button onClick = {handleSubmit} >Submit</button>
                    </div>
                </div>
                {/*Comments Section*/}
                <div style = {commentsContainerStyle}>
                    {bite.comment && bite.comment.length > 0 ? (
                        <ul>
                            {bite.comment.map((comment, index) =>
                            <li key = {index}>{comment}</li>
                            )}
                        </ul>
                    ) : (
                        <p>No Comments Yet.</p>

                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowcaseBite;