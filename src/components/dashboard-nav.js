import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
// import '../styles/dashboard-nav.css';

export const DashboardNav = () => {

  return(
    <header className="site-header" id="site-header">
      <div className="logo-wrapper">
        <div className="logo">
          <Link to="/">
            <img 
              src={icon} 
              alt="RoadRate icon" 
              className="icon"
            />
            <h1>RoadRate</h1>
          </Link>
        </div>
      </div>

      <div className="header-middle-area">
        <nav className="main-nav" id="main-nav">
          <ul className="main-sections">
            
            <li className="claim-plate">
              <Link to="/claim-plate"
                className="claim-link"
              >
                <span>
                  Claim A Plate
                </span>
              </Link>
            </li>

            <li className="my-plates">
              <Link to="/my-plates" 
                className="my-plates-link"
              >
                <span >
                  MyPlates
                </span>
              </Link>
            </li>
            
            <li className="my-reviews">
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