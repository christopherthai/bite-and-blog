import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Bite({selectedMeal}) {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/meals', {
          cache: 'no-store', // 캐시 사용하지 않음
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const shuffledItems = shuffleArray(jsonData); // 배열을 무작위로 섞음
        const randomThreeItems = shuffledItems.slice(0, 4); // 무작위로 선택된 3개의 아이템을 가져옴
        setRecent(randomThreeItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 배열을 무작위로 섞는 함수
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div style={{
      width: '116rem',
      height: "25rem",
      position: 'absolute',
      top:"70%",
      left:"2%",
      justifyContent: 'space-between',
    }}>
      <h1></h1>
      <div style={{ display: 'flex' }}>
        {recent.length > 0 ? (
          recent.map((meal, index) => (
            <div key={meal.id} style={{ marginRight: index !== 2 ? '3px' : '0', position: 'relative', left:'50px', bottom:"0px" }}>
              {meal.strMealThumb && 
              <div>
                <Link to={`/ShowcaseBite/${meal.id}`} key={meal.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <img style={{
                    width:"24rem", 
                    height:"13rem",
                    borderRadius: '10px',
                    objectFit: 'cover',                 
                    overflow: 'hidden',
                    }}
                    src={meal.strMealThumb} alt={meal.strMeal} />
                  <h2 style={{ 
                      position: 'absolute', 
                      bottom: '0px', 
                      left: '15px', 
                      color: 'white',
                      backgroundColor: 'black',
                      display: 'inline-block',
                      fontSize: '15pt'
                      }}>
                          {meal.strMeal}
                      </h2>
                </Link>
              </div>}
            </div>
          ))
        ) : (
          <p>No recent posts available</p>
        )}
      </div>
    </div>
  );
}

Bite.propTypes = {
    selectedMeal: PropTypes.object, // selectedMeal props가 객체임을 검사
  };


export default Bite;