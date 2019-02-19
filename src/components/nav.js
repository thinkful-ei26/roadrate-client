import React from 'react';
import { Link } from 'react-router-dom';
import LoginModal from './login-modal.js';
import About from './about.js';
import '../styles/nav.css';

export const Nav = () => {
  return(
  <div className="navbar">
    <ul className="nav-list">
        <div className='left-nav'>
            <li className="nav-item"> 
                <About />
            </li>
        </div>

        <div className='right-nav'>
            <li className="nav-item">
                <Link to="/login" className="login-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link to="/register" className="register-link">Register</Link>
            </li>
        </div>
    </ul>
  </div>
  )
  
}

export default Nav;