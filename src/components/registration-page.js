import React from 'react';
import { Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';
// import Header from './header';


export const RegistrationPage = (props) => {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    const signup = () => {
        return (
            <h4>Sign Up</h4>
        )
    }

    return (
        <div className="home">
            {/* <Header 
                subHeader={signup}
            /> */}
            <h5>Register to start rating</h5>
            <RegistrationForm />
            {/* <Link to="/">Login</Link> */}
        </div>
    );
}

export default RegistrationPage;
