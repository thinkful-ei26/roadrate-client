import React, { myFetch, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import Header from './header';
import Login from './login-form';
import Nav from './nav';
import ReviewList from './ReviewList';
import { API_BASE_URL } from '../config';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    if (localStorage.authToken) {
        return <Redirect to="/dashboard" />;
    } 

    return (
        <div className="home">
            <Header />
            <Modal
                header='Modal Login'
                trigger={
                    <Button waves='teal'>
                        LOG IN!<Icon right><Login/></Icon>
                    </Button>
                }
            />
            < Nav />
            <ReviewList />
        </div>
    );
}

// const mapStateToProps = state => ({
//     loggedIn: state.auth.currentUser !== null
// });

export default LandingPage;
