import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function RecentBitesList({ selectedMeal }) {
  const [recent, setRecent] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/meals');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        const sortedRecent = jsonData.sort((a, b) => b.date.localeCompare(a.date));
        const recentTenRecent = sortedRecent.slice(0, 3);
        setRecent(recentTenRecent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div>
      <h2 style={{ position: 'absolute', top: '10%', right: '12%', fontSize: '30pt' }}>
        Recent Bites
      </h2>
      {recent.map((item, index) => (
        <Link to={`/ShowcaseBite/${item.id}`} key={index}> {/* Link 컴포넌트를 카드 요소로 감싸기 */}
          <Card
            style={{
              width: '35rem',
              height: '16rem',
              position: 'absolute',
              top: `${ 15 + 17 * index}%`,
              right: '70px',
              backgroundImage: `url(${item.strMealThumb})`,
              backgroundSize: 'cover',
              filter: hoveredCard === index ? 'brightness(110%)' : 'none',
              transition: 'filter 0.5s ease',
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <Card.Title 
                style={{ 
                  color: 'white', 
                  backgroundColor: 'black', 
                  padding: '5px', 
                  display: 'inline-block', 
                  position: 'relative' 
                }}
              >
                {item.strMeal}
                <span style={{ 
                  backgroundColor: 'black', 
                  position: 'absolute', 
                  width: `${item.strMeal.length * 0.7}ch`, 
                  height: '100%', 
                  top: 0, 
                  left: 0, 
                  zIndex: -1 
                }}></span>
                {item.strMeal}
              </Card.Title>
            </Card.Body>
            {hoveredCard === index && selectedMeal && (
              <Card.Title>
                <Card.Text></Card.Text>
                {/* Link 컴포넌트를 사용하여 특정 페이지로 이동 */}
                <Link to={`/ShowcaseBite/${selectedMeal.id}`}></Link>
              </Card.Title>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
}

RecentBitesList.propTypes = {
  selectedMeal: PropTypes.object, // selectedMeal props가 객체임을 검사
};

export default RecentBitesList;