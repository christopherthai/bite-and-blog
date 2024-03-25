import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function MainContent() {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/meals');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();

        // 필요한 필드만 추출하여 새로운 배열 생성
        const extractedMeals = jsonData.map((meal) => ({
          id: meal.id, // 각 meal에 id 추가
          strMeal: meal.strMeal,
          strInstructions: meal.strInstructions,
          strMealThumb: meal.strMealThumb,
        }));

        setMeals(extractedMeals); // 추출된 데이터 설정

        // 데이터를 가져온 후에 초기에 무작위 음식을 선택하고 페이드 인 효과를 적용
        if (extractedMeals.length > 0) {
          const randomIndex = Math.floor(Math.random() * extractedMeals.length);
          setSelectedMeal(extractedMeals[randomIndex]);
          setFadeIn(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // 의존성 배열에 빈 배열 전달하여 초기 렌더링 시에만 실행되도록 함

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered && meals.length > 0) {
        const randomIndex = Math.floor(Math.random() * meals.length);
        setFadeIn(false); // 페이드 아웃 효과를 주기 위해 false로 설정
        setTimeout(() => {
          setSelectedMeal(meals[randomIndex]);
          setFadeIn(true); // 페이드 인 효과를 주기 위해 true로 설정
        }, 500); // 0.5초 후에 카드 변경 및 페이드 인 효과 적용
      }
    }, 5000);

    // cleanup 함수를 이용하여 컴포넌트가 unmount될 때 interval 정리
    return () => clearInterval(interval);
  }, [isHovered, meals]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      {selectedMeal && (
        <Card
          style={{
            width: '80rem',
            height: '910px',
            position: 'absolute',
            top: '10%',
            left: '33%',
            transform: 'translateX(-50%)',
            overflow: 'hidden',
            opacity: fadeIn ? 1 : 0, // 선택된 카드가 페이드 인/아웃 되도록 opacity 설정
            transition: 'opacity 2s ease', // opacity에 대한 트랜지션 설정
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img
            variant="top"
            src={selectedMeal.strMealThumb}
            style={{
              objectFit: 'cover',
              width: 'auto',
              height: '910px',
              contrast: "120%",
              filter: isHovered ? 'brightness(120%)' : 'brightness(110%)', // 마우스를 올렸을 때 이미지 밝기를 조절하여 하얗게 만듦
              transition: 'filter 0.5s ease', // 밝기에 대한 트랜지션 설정
            }}
          />
          <Card.Body style={{ position: 'absolute', top: 0, left: 0, width: '100%', backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.7)' : 'transparent' }}>
            <Card.Title style={{ 
              color: 'white', 
              backgroundColor: 'black',
              textAlign: 'center', 
              fontSize: '30pt',
              display: 'inline-block', // 배경 색상이 글자 길이만큼만 차지하도록 함
            }}>
              {selectedMeal.strMeal}
            </Card.Title>
            <Card.Text style={{ textAlign: 'center' }}>
              {isHovered && selectedMeal.strInstructions} {/* 호버 시 설명 표시 */}
            </Card.Text>
          </Card.Body>

          <Card.Body style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
            <Card.Text style={{ textAlign: 'center', fontSize: '15pt', backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px' }}>
              <Link to={`/ShowcaseBite/${selectedMeal.id}`} style={{ color: 'black', textDecoration: 'none' }}>More Information</Link>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default MainContent;