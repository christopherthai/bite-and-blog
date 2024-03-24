import React from 'react'
import MainContent from "../components/MainContent.jsx"
import RecentBitesList from "../components/RecentBitesList.jsx"
import Bite from "../components/Bite.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';




function Home() {
 return (
   <>
    
     <MainContent/>
     <RecentBitesList/>
     {/* <Bite/> */}
    
   </>
 );
}



export default Home;