<<<<<<< HEAD
import React from 'react'
import MainContent from "./components/MainContent.jsx"
import RecentBitesList from "./components/RecentBitesList.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap 

function App() {
  

  return (
      <div>
        <MainContent/>
        <RecentBitesList/>
      </div>
  )
=======
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import './index.css'

function App() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
>>>>>>> 18d00b62bbed2ed96564230adb5db66c8f17c716
}

export default App;
