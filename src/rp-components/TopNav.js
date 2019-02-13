import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

export class TopNav extends Component {
  render() {
    return (
          <nav className="App-header">
            <button className='feed-button'>Reviews Feed</button>
              <h1 className='page-title'><Link className='title-anchor' to='/'>RoadRate</Link></h1>
            <button className='account-info-button'>My Account</button>
          </nav>
    );
  }
}