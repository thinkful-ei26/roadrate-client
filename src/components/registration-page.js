import React from 'react';
import RegistrationForm from './registration-form';
import icon from '../assets/thumbs-up.png';
import '../styles/registration-form.css';

export function RegistrationPage() {
    return (
        <div className="registration-page">
            <img 
                src={icon} 
                alt="icon" 
                className="registration-icon"
            />
            <h1>Register to RoadRate</h1>
            <RegistrationForm />
        </div>
    );
}

export default RegistrationPage;
