import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/dashboard-nav.css';

export const DashboardNav = () => {

  return(
    <header class="site-header" id="site-header">

      <div class="logo">
        <Link to="/">
          <img 
            src={icon} 
            alt="RoadRate icon" 
            className="icon"
          />
          <h1>RoadRate</h1>
        </Link>
      </div>

      <div class="header-middle-area">
        <nav class="main-nav" id="main-nav">
          <ul class="main-sections">
            
            <li class="claim-plate">
              <Link to="/claim-plate"
                className="claim-link"
              >
                <span>
                  Claim A Plate
                </span>
              </Link>
            </li>

            <li class="my-plates">
              <Link to="/my-plates" 
                className="my-plates-link"
              >
                <span >
                  MyPlates
                </span>
              </Link>
            </li>
            
            <li class="my-reviews">
              <Link to='/my-reviews' 
                className="my-reviews-link"
              >
                <span >
                  My Reviews
                </span>
              </Link>
            </li>
          
          </ul>
        </nav>
      </div> 
    </header>
  );
}

export default DashboardNav;