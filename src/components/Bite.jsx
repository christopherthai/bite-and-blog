import React, {useState, useEffect} from 'react'

function Bite() {
    const [recent, setRecent] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/meals');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                const sortedRecent = jsonData.sort((a, b) => b.date.localeCompare(a.date));
                const recentTenRecent = sortedRecent.slice(0, 10);
                setRecent(recentTenRecent);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


  return (
    <div>
        <h1>Recent 10 Bites</h1>
        <ul>
            {recent.length > 0 ? (
                recent.map(meal => (
                    <li key = {meal.id}>
                        {meal.strMealThumb && <img src={meal.strMealThumb} alt={meal.strMeal} />}
                        {meal.strMeal && <h2>{meal.strMeal}</h2>}
                    </li>
                ))
            ) : (
                <li>No recent posts available</li>
            )}
        </ul>
    </div>
    )
}

export default Bite;



