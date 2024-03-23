import React from 'react'
import MainContent from "./components/MainContent.jsx"
import RecentBitesList from "./components/RecentBitesList.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import './index.css'

function App() {
  

  return (
      <div>
        <MainContent/>
        <RecentBitesList/>
        <Header />
        <Outlet />
        <NavBar />
      </div>
  )
}


export default App;
