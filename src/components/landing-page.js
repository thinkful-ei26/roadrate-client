import React from 'react';
import {Redirect} from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import Modal from 'react-modal';

import Header from './header';
import Login from './login-form';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    console.log('props: ', props)
    if (props.authToken) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="home">
            <Header />
            <Modal
                header='Modal Login'
                trigger={<Button waves='light'>LOG IN!<Icon right><Login/></Icon></Button>}>
            </Modal>
            {/* <ul className="landing-links">
                <li className="login-link">
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/about">About RoadRate</Link>
                </li>
            </ul> */}
        </div>
    );
}

export default LandingPage;