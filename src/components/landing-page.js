import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Header from './header';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    console.log('props: ', props)
    if (props.authToken) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <Header />
            <ul className="landing-links">
                <li className="login-link">
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/about">About RoadRate</Link>
                </li>
            </ul>
        </div>
    );
}

export default LandingPage;