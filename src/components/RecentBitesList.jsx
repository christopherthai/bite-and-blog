import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function RecentBitesList({ selectedMeal }) {
  const [recent, setRecent] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/meals");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const sortedRecent = jsonData.sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        const recentTenRecent = sortedRecent.slice(0, 3);
        setRecent(recentTenRecent);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    <div className="recent">
      <Card
        style={{
          width: "650px",
          height: "210px",
          bottom: "640px",
          left: "1020px",
          fontSize: "70pt",
          borderRadius: "0px",
          justifyContent: "center",
          textAlign: "center",
          color: "black",
          backgroundColor: "white",
        }}
      >
        RECENT BITES
      </Card>

      {recent.map((item, index) => (
        <Link to={`/ShowcaseBite/${item.id}`} key={index}>
          <Card
            style={{
              left: "1020px",
              bottom: "620px",
              width: "650px",
              height: "210px",
              borderRadius: "0px",
              marginBottom: "20px", // 각 카드의 아래쪽에 마진을 추가하여 간격 조절
              backgroundImage: `url(${item.strMealThumb})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: hoveredCard === index ? "brightness(110%)" : "none",
              transition: "filter 0.5s ease",
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <Card.Body>
              <Card.Title
                style={{
                  color: "white",
                  backgroundColor:
                    "rgba(0, 0, 0, 0.5)" /* 배경색과 투명도 설정 */,
                  padding: "5px",
                  display: "inline-block",
                  position: "relative",
                  fontSize: "15pt",
                }}
              >
                {item.strMeal}
              </Card.Title>
            </Card.Body>

            {hoveredCard === index && selectedMeal && <Card.Title></Card.Title>}
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
