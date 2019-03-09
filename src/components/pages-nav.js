import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/navbars/dashboard-nav.css';

export const PagesNav = () => {
  let claimPlate = "/claim-plate"
  let myPlates = "/my-plates";
  let myReviews = "/my-reviews"

  if (!localStorage.loggedIn) {
    claimPlate = myPlates = myReviews = "/register";
  }

  return(
    <main className="pages-nav">
      <section className="logo-wrapper">
        <ul className="smaller-header-logo">
          <li className="header">
            <Link to="/"><h1>RoadRate</h1></Link>
          </li>
          <li className="icon">
            <img src={icon} 
            alt="RoadRate icon" 
            className="icon"
          />
          </li>
        </ul>
      </section>
      <section className="header-middle-area">
        <nav className="main-nav" id="main-nav">
          <ul className="main-sections">
            <li className="claim-plate">
              <Link to={claimPlate}
                className="claim-link"
              >
                <span>
                  Claim Plate
                </span>
              </Link>
            </li>
            <li className="my-plates">
              <Link to={myPlates} 
                className="my-plates-link"
              >
                <span >
                  My Plates
                </span>
              </Link>
            </li>          
            <li className="my-reviews">
              <Link to={myReviews} 
                className="my-reviews-link"
              >
                <span >
                  My Reviews
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </section> 
    </main>
  );
}

export default PagesNav;