import { useState, useEffect } from 'react'

function Pull() {
  const [data, setData] = useState(null)
  const url = `https://www.themealdb.com/api/json/v1/1/random.php`
 
useEffect(()=> {
    fetch(url)
      .then (res => {
        if (!res.ok) {
          console.log("Error fetching data");
        }
        return res.json();       
      })
      .then (data => {
        if (data.meals && data.meals.length > 0)
        setData(data.meals[0]);
      })
      .catch(error => console.log("Error fetching data:", error));   
  }, []);

const relevantKeys = ['idMeal', 'strMeal', 'strCategory', 'strArea', 'strInstructions', 'strMealThumb', 'strTags', 'strYoutube']

const filteredRelevantData = (original, keys)=>{
    //if (!original) return {};
    const filteredData = {};
    keys.forEach(key =>{
        if (original.hasOwnProperty(key)){
            filteredData[key]= original[key];
        }
    });
    return filteredData;
}

useEffect(()=>{
    if (data){
        const relevantData = filteredRelevantData(data, relevantKeys);
        console.log(`fetched data`, data);
        console.log(`Filtered relevant data:`, relevantData);

        
    fetch(`http://localhost:4000/meals/`, {
      method:'POST',
      headers: {
        'Content-Type':'Application/JSON',
      },
      body: JSON.stringify(relevantData),
    })
      .then(res=>res.json())
      
      .catch(error=> console.log('Error adding plant:', error));

    }
}, [data])


  
return null;

}; 

export default Pull
