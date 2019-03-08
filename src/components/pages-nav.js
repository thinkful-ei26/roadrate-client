import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/navbars/dashboard-nav.css';

export const PagesNav = () => {

  return(
    <main className="pages-nav">
      <section className="logo-wrapper">
        <ul className="smaller-header-logo">
          <li className="header">
          <Link to="/"><h1>RoadRate</h1></Link>
          </li>
          <li className="icon"><img 
          src={icon} 
          alt="RoadRate icon" 
          className="icon"
          />
          </li>
        </ul>
      </section>
    </main>
  );
}

export default PagesNav;