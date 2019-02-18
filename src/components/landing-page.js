import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Icon } from 'react-materialize';
import Modal from 'react-modal';
import Header from './header';
import Login from './login-form';
import Nav from './nav';
import ReviewList from './ReviewList';
import SearchReviews from './search-reviews';

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
            <SearchReviews />
            <ReviewList />
        </div>
    );
}

export default LandingPage;
