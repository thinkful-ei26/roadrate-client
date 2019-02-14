import React from 'react';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';

export const RegistrationPage = (props) => {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className="home">
            <h2>Sign Up</h2>
            <RegistrationForm />
            {/* <Link to="/">Login</Link> */}
        </div>
    );
}

export default RegistrationPage;
