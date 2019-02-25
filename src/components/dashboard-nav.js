import React from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/dashboard-nav.css';

export const DashboardNav = () => {

  // const logout = () => {
  //   localStorage.clear();
  //   localStorage.setItem("logout", true)
  // };

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

    {/* <div className="logout">
      <Link to="/">
        <button 
          className="logout" 
          onClick={() => logout()}
        >
          Logout
        </button>
      </Link >
    </div> */}

    <div 
      class="search" 
      role="search" 
      id="search-area"
    >
    <div class="chw-widget">
      <form role="search" method="get" id="searchform" class="search-form" action="https://css-tricks.com/">

      <label class="screen-reader-text" id="search-label" for="search-input">
        Search for:
      </label>

      <input type="search" required="" name="s" id="search-input" class="search-field" placeholder="e.g. ABC123" value=""/>

      <input type="hidden" name="orderby" value="relevance"/>

      <input type="hidden" name="post_type" value="post,page,guide"/>

      <button type="submit" class="button-invisible">
        <span 
          class="screen-reader-text"
        >
          Search
        </span>
      {/* <svg class="icon-search" width="26px" height="26px">
        <use xlink:href="#icon-search"></use>
      </svg> */}
    </button>

  </form></div>            </div>

  
    
  </header>
  );
}

export default DashboardNav;