import React, {useState} from "react";
import MainContent from "../components/MainContent.jsx";
import RecentBitesList from "../components/RecentBitesList.jsx";
import Bite from "../components/Bite.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap

function Home() {

  const [selectedMeal, setSelectedMeal] = useState(null);

  return (
    <div style={{maxHeight:'100vh', overflow:'hidden',}}>
      <MainContent selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal}/>
      <RecentBitesList selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal}/>
      <Bite/>
    </div>
  );
}



export default Home;