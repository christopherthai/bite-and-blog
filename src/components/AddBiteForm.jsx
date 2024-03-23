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
        const now = new Date();
        const dateStamp = now.toISOString().split('T')[0];
        const mealDataWithDate = {...addMeal, dateStamp};
        console.log(addMeal);
        fetch('http://localhost:4000/meals/', {
            method:'POST',
            headers: {
              'Content-Type':'Application/JSON',
            },
            body: JSON.stringify(mealDataWithDate),
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
                placeholder="Category"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strArea"
                value={addMeal.strArea}
                onChange={handleChange}
                placeholder="Area"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <textarea
                name="strInstructions"
                value={addMeal.strInstructions}
                onChange={handleChange}
                placeholder="Instructions"
                style={{ marginBottom: '10px', width: '100%' }}
            />
            <input
                type="text"
                name="strMealThumb"
                value={addMeal.strMealThumb}
                onChange={handleChange}
                placeholder="Meal Thumbnail URL"
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