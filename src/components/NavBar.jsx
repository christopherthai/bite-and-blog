import "./designNav.css";
import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/addbite">Add Bites</NavLink>
      <NavLink to="/allbites">All Bites</NavLink>
      <NavLink to="/favoritebites">Fav Bites</NavLink>
    </nav>
  );
}

export default NavBar;
