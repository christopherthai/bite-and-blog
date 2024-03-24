import React, { useState } from 'react';

function AddBiteForm() {
    const [addMeal, setAddMeal] = useState({
        strMeal: '',
        strCategory: '',
        strArea: '',
        strInstructions: '',
        strMealThumb: '',
        strTags: '',
        strYoutube: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddMeal(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(addMeal);
        fetch('http://localhost:4000/meals/', {
            method:'POST',
            headers: {
              'Content-Type':'Application/JSON',
            },
            body: JSON.stringify(addMeal),
        })
            .then(res=>res.json())
            .then(data => console.log(`Posted meal`, data))
            .catch(error=> console.log('Error adding plant:', error));
        
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
                <input
                type="text"
                name="strMeal"
                value={addMeal.strMeal}
                onChange={handleChange}
                placeholder="Meal Name"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strCategory"
                value={addMeal.strCategory}
                onChange={handleChange}
                placeholder="Category e.g. Pasta, Seafood, Dessert"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strArea"
                value={addMeal.strArea}
                onChange={handleChange}
                placeholder="Area of Origin"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <textarea
                name="strInstructions"
                value={addMeal.strInstructions}
                onChange={handleChange}
                placeholder="Instructions/Recipe"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strMealThumb"
                value={addMeal.strMealThumb}
                onChange={handleChange}
                placeholder="Meal Picture URL"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strTags"
                value={addMeal.strTags}
                onChange={handleChange}
                placeholder="Tags"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strYoutube"
                value={addMeal.strYoutube}
                onChange={handleChange}
                placeholder="YouTube URL"
                style={{ marginBottom: '5px', width: '100%' }}
            />
            <button type="submit" onSubmit = {handleSubmit} style={{ marginTop: '5px' }}>Submit Meal</button>
            </form>
        </div>
    
    );
}
    
    export default AddBiteForm;