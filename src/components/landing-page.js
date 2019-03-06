import React from 'react';
import { Redirect } from 'react-router-dom';
import LandingNav from './landing-nav';
import ReviewList from './review-list';
import About from './about.js';
import '../styles/pages/landing.css';

export const LandingPage = (props) => {
    // If we are logged in redirect straight to the user's dashboard
    if (localStorage.authToken) {
      return <Redirect to="/dashboard" />;
    } 

    return (
      <main className="home">
        <section className="landing-top">
          <LandingNav />
          <article className='landing-content'>
            <article className='landing-text'>
              <h1>RoadRate</h1>
              <p id="catch-phrase">choose rate, not rage</p>
              <p id='responsibly'>Responsibly rate drivers.</p>
              <p id='anonymous'>100% anonymous.</p>
              <article className="about">
                <About />
              </article>  
            </article>   
          </article>
        </section>
        <ReviewList />
      </main>
    );
}

export default LandingPage;
