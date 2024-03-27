import React, { useState } from 'react';

function AddBiteForm() {

    const blankMeal = {
        strMeal: '',
        strCategory: '',
        strArea: '',
        strInstructions: '',
        mealPreparationTime: '',
        strMealThumb: '',
        strTags: '',
        strYoutube: '',
    }
    const [addMeal, setAddMeal] = useState(blankMeal);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setAddMeal(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        const now = new Date();
        const date = now.toISOString().split('T')[0];
        const mealDataWithDate = {...addMeal, date};
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
            .catch(error=> console.log('Error posting meal:', error));
            setAddMeal(blankMeal);
        
    };

    return (
        <div className="add-bite-form" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
                <input
                type="text"
                name="strMeal"
                value={addMeal.strMeal}
                onChange={handleChange}
                placeholder="Bite Name"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <input
                type="text"
                name="strCategory"
                value={addMeal.strCategory}
                onChange={handleChange}
                placeholder="Category e.g. Pasta, Seafood, Dessert"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <input
                type="text"
                name="strArea"
                value={addMeal.strArea}
                onChange={handleChange}
                placeholder="Area of Origin"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <textarea
                name="strInstructions"
                value={addMeal.strInstructions}
                onChange={handleChange}
                placeholder="Instructions/Recipe"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <input
                type="text"
                name="mealPreparationTime"
                value={addMeal.mealPreparationTime}
                onChange={handleChange}
                placeholder="Meal Preparation Time e.g. 30 minutes, 1 hour"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <input
                type="text"
                name="strMealThumb"
                value={addMeal.strMealThumb}
                onChange={handleChange}
                placeholder="Meal Picture URL"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <input
                type="text"
                name="strTags"
                value={addMeal.strTags}
                onChange={handleChange}
                placeholder="Tags"
                style={{ marginBottom: '10px', width: '100%', fontFamily: 'Roboto' }}
            />
            <input
                type="text"
                name="strYoutube"
                value={addMeal.strYoutube}
                onChange={handleChange}
                placeholder="YouTube URL"
                style={{ marginBottom: '5px', width: '100%', fontFamily: 'Roboto' }}
            />
            <button type="submit" onSubmit = {handleSubmit} style={{ marginTop: '5px' }}>Submit Bite!</button>
            </form>
        </div>
    
    );
}
    
    export default AddBiteForm;