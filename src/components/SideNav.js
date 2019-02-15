import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

export class SideNav extends Component {
  render() {
    return (
          <nav className="side-nav">
            <button className='posts-by-me-button'>Posts By Me</button>
            <button className='posts-about-me-button'>Posts About Me</button>
            <button className='find-communities-button'>Find Communities</button>
          </nav>
    );
  }
}