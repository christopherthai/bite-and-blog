import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';

function RecentBitesList() {

    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseEnter = (cardNumber) => {
        setHoveredCard(cardNumber);
      };
    
      const handleMouseLeave = () => {
        setHoveredCard(null);
      };

  return (
    <div>
        <h2 style={{position: 'absolute', top : '15%', right: '15%', fontSize : "30pt" }}>
            Recent Bites
        </h2>
        <Card 
            style={{ 
            width: '35rem', 
            height: '15rem', 
            position: 'absolute', 
            top : '20%', 
            right: '50px',
            backgroundImage: 'url("src/images/hotdog.jpeg")', 
            backgroundSize: 'cover',
            filter: hoveredCard === 1 ? 'blur(30px)' : 'none',
          transition: 'filter 0.5s ease'
        }}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
      >
            
            <Card.Body>
            <Card.Title style={{ color: 'white' }}>Recent 1</Card.Title>
            <Card.Text>
            
            </Card.Text>
            </Card.Body>
            
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
            
            {hoveredCard === 1 && (
            <Card.Title>
            <Card.Text style={{ color: 'white' }}>Comment from users</Card.Text>
            </Card.Title>
            )}
        </Card>

        <Card 
        style={{ 
            width: '35rem',
            height: '15rem',  
            position: 'absolute', 
            top: '40%', 
            right: '50px', 
            backgroundImage: 'url("src/images/fac.webp")', 
            backgroundSize: 'cover',
            filter: hoveredCard === 2 ? 'blur(30px)' : 'none',
            transition: 'filter 0.5s ease'
        }}
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={handleMouseLeave}
            >
            
            <Card.Body>
            <Card.Title style={{ color: 'white' }}>Recent 2</Card.Title>
            <Card.Text>
            
            </Card.Text>
            </Card.Body>
            
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
        </Card>

        <Card 
            style={{ 
            width: '35rem', 
            height: '15rem', 
            position: 'absolute', 
            top: '60%', right: '50px', 
            backgroundImage: 'url("src/images/pizza.jpg")', 
            backgroundSize: 'cover',
            filter: hoveredCard === 3 ? 'blur(30px)' : 'none',
          transition: 'filter 0.5s ease'
        }}
        onMouseEnter={() => handleMouseEnter(3)}
        onMouseLeave={handleMouseLeave}
        >
            
            <Card.Body>
            <Card.Title style={{ color: 'white' }}>Recent 3</Card.Title>
            <Card.Text>
            
            </Card.Text>
            </Card.Body>
            
            <Card.Body>
                <Card.Link href="#">Card Link</Card.Link>
            </Card.Body>
        </Card>
    </div>
  );
}

export default RecentBitesList;