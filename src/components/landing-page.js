import React from 'react';
import {Link, Redirect} from 'react-router-dom';
// import LoginForm from './login-form';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    console.log('props: ', props)
    if (props.authToken) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            {/* <h2>Login</h2> */}
            {/* <LoginForm /> */}
            <ul className="landing-links">
                <li className="login-link">
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        </div>
    );
}

export default LandingPage;