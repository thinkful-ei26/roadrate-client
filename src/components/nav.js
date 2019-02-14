import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/nav.css';

export const Nav = () => {
  return(
  <div className="nav-container">
    <ul className="about-links">
      <li className="nav-items">
          <Link to="/login" className="login-link">Login</Link>
      </li>
      <li className="nav-items">
          <Link to="/register" className="register-link">Register</Link>
      </li>
      <li className="nav-items"> 
          <Link to="/about" className="about-link">About RoadRate</Link>
      </li>
      <li className="nav-items">
          <Link to="/" className="landing-link">Home</Link>
      </li>
    </ul>
  </div>
  )
  
}

export default Nav;