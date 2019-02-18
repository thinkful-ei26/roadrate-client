import React from 'react';
import { Redirect } from 'react-router-dom';
import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    return (
        <div className="registration-page">
            <h5>Register to start rating</h5>
            <RegistrationForm />
        </div>
    );
}

export default RegistrationPage;
