import React from 'react';
import { Redirect } from 'react-router-dom';
// import { Button, Icon } from 'react-materialize';
import Header from './header';
import Nav from './nav';
import ReviewList from './ReviewList';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    if (localStorage.authToken) {
        return <Redirect to="/dashboard" />;
    } 

    return (
        <div className="home">
            <Header />
            < Nav />
            <ReviewList />
        </div>
    );
}

export default LandingPage;
