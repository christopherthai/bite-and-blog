import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

function Bite() {
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
      <div>
        {recent.length > 0 ? (
          recent.map((meal, index) => (
            <Card key={meal.id} 
                style={{ 
                    position:'relative', 
                    display:'inline-block', 
                    width:'395px', 
                    height:'210px', 
                    left:'30px',
                    borderRadius: '0px', 
                    marginRight:'20px', 
                    bottom:'620px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                    {meal.strMealThumb && 
            
                <Link to={`/ShowcaseBite/${meal.id}`} key={meal.id} 
                    style={{ 
                        textDecoration: 'none', 
                        color: 'inherit' 
                    }}>
                    <Card.Img 
                        style={{ 
                            width:"395px", 
                            height:"210px", 
                            borderRadius: '00px' 
                            }} 
                            src={meal.strMealThumb} 
                            alt={meal.strMeal}
                        />
                    <Card.Title style={{ 
                        position: 'absolute', 
                        bottom: '10px', 
                        left: '10px', 
                        color: 'white', 
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', /* 배경색과 투명도 설정 */
                        padding: '5px',
                        fontSize: '15pt',
                        zIndex: 1 /* 이미지 위에 위치하도록 설정 */
                    }}>
                    {meal.strMeal}
                    </Card.Title>
                </Link>
            }
            </Card>
          ))
        ) : (
          <p>No recent posts available</p>
        )}
      </div>
  );
}

Bite.propTypes = {
    selectedMeal: PropTypes.object, // selectedMeal props가 객체임을 검사
  };


export default Bite;