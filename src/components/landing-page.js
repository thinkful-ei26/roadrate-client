import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Button, Icon } from 'react-materialize';
import Header from './header';
import Nav from './nav';
import ReviewList from './ReviewList';
import '../styles/landing.css';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    if (localStorage.authToken) {
        return <Redirect to="/dashboard" />;
    } 

    return (
        <div className="home">
            {/* <Header /> */}
            <Nav />
            <div className='landing-content'>
                <div className='landing-text'>
                    <h1>RoadRate</h1>
                    <img id='landing-img' src={require('../images/road.jpg')} alt='road'></img>
                    <p>Responsibly rate drivers. 100% anonymous.</p>
                </div>        
            </div>
            <ReviewList />
        </div>
    );
}

export default LandingPage;
