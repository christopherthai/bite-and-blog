import React, {useState} from 'react'
import Card from 'react-bootstrap/Card';

// put picture of food
// put name of the food
// put description of the food
// put comments of the food

// Randomly change food every 5-10 second
  // Link food information and comment from All Bite
  // Create a link to visit and see more information of the food

function MainContent() {
  
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      style={{ 
        width: '45rem', 
        position: 'absolute', 
        top: '20%', 
        marginLeft : "50px",
        overflow: 'hidden'
        }}>
    <Card.Img 
        variant="top" 
        src="src/components/spaghetti.jpg" 
        style={{
          objectFit: 'cover',
          width: 'auto',
          height: '800px',
          filter: isHovered ? 'hover' : 'none',
          transition: 'filter 0.5s ease'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}/>
    <Card.Body>
      <Card.Title style={{ textAlign : "center", fontSize : "20pt" }}>Tomato Spaghetti</Card.Title>
      <Card.Text style={{ textAlign : "center" }}>
        Tomato spaghetti is a classic Italian dish consisting of
        al dente spaghetti noodles coated in a tangy tomato-based sauce. 
        The sauce is made by simmering minced garlic in olive oil with canned diced tomatoes, 
        seasoned with salt, pepper, and optionally red pepper flakes. 
        Once cooked, the spaghetti is tossed with the sauce until evenly coated. 
        Garnished with fresh basil and grated Parmesan cheese, 
        this dish is beloved for its simplicity and delicious flavors, 
        making it a popular choice for any occasion.
      </Card.Text>
    </Card.Body>
    
    <Card.Body>
      <Card.Text style={{ textAlign : "center", fontSize : "15pt" }}>
        "User comment"
      </Card.Text>
      <Card.Text style={{ textAlign : "center", fontSize : "10pt" }}>
        "User name"
      </Card.Text>
      <Card.Link style={{}} href="#">Comment food Link</Card.Link>
    </Card.Body>
  </Card>
  )
}

export default MainContent;