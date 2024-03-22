import { useState, useEffect } from 'react'

function Pull() {
  const [data, setData] = useState(null)
  const url = `www.themealdb.com/api/json/v1/1/random.php`

  useEffect(()=> {
    fetch(url)
      .then (res => {
        if (!res.ok) {
          console.log("Error fetching data");
        }
        return res.json();       
      })
      .then (data => setData(data))
      .catch(error => console.log("Error fetching data:", error));   
  }, []);

const relevantKeys = [idMeal, strMeal, strCategory, strArea, strInstructions, strMealThumb, strTags, strYoutube]

const filteredRelevantData = (original, keys){
    const filteredData = {};
    keys.forEach(key =>{
        if (original.hasOwnProperty(key)){
            filteredData[Key]= original[key];
        }
    });
    return filteredData;
}
const relevantData = filteredRelevantData(data, relevantKeys);

console.log(relevantData)

};

export default App