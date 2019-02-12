import React, { Component }  from 'react';
import { Link } from 'react-router-dom';
import './TopNav.css';

export class TopNav extends Component {
  render() {
    return (
          <nav className="App-header">
            <b
            <Search />
            <h1 className='page-title'><Link className='title-anchor' to='/'>Donna's Crafts 'N Creations</Link></h1>
            <Link className='title-anchor' to='/'><img className='fancy-d' alt='black D with flowers' src={mobileLetter}></img></Link>
            <Account />
            <ShoppingCart />
          </nav>
    );
  }
}