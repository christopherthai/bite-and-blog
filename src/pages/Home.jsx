import React from "react";
import MainContent from "../components/MainContent.jsx";
import RecentBitesList from "../components/RecentBitesList.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; //import bootstrap

function Home() {
  return (
    <>
      <MainContent />
      <RecentBitesList />
    </>
  );
}


export default Home;