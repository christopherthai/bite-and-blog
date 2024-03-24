import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';


function RecentBitesList() {


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
        const recentTenRecent = sortedRecent.slice(0, 3);
        setRecent(recentTenRecent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };
  
  const handleMouseLeave = () => {
    setHoveredCard(null);
  };


  
  return (
    <div>
      <h2 style={{ position: 'absolute', top: '15%', right: '15%', fontSize: '30pt' }}>
        Recent Bites
      </h2>
      {recent.map((item, index) => (
        <Card
          key={index}
          style={{
            width: '35rem',
            height: '15rem',
            position: 'absolute',
            top: `${20 + 20 * index}%`,
            right: '50px',
            backgroundImage: `url(${item.strMealThumb})`,
            backgroundSize: 'cover',
            filter: hoveredCard === index ? 'brightness(110%)' : 'none',
            transition: 'filter 0.5s ease',
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Body>
            <Card.Title>{item.strMeal}</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
          <Card.Body>
            
          </Card.Body>

          {hoveredCard === index && (
            <Card.Title>
              <Card.Text></Card.Text>
              <Card.Link href="#">Link</Card.Link>
            </Card.Title>
          )}
        </Card>
      ))}
    </div>
  );
}

export default RecentBitesList;