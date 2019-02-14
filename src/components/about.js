import React from 'react';
import { Link } from 'react-router-dom';


export const About = () => {

    return (
       <div className="about">
            <h1>What is RoadRate?</h1>
            <h4><i>RoadRate was founded to safely and anonymously encourage quality road etiquette for the over 220 million drivers currently licensed in America.</i></h4>
            <p><b>Have you ever been perplexed by a neighbor that continuously parks in a way that blocks you from using an otherwise perfectly viable space?</b><br/> With RoadRate, you can find their license plate, rate it, leave a review and upload a photo 100% anonymously.</p>
            <p><b>What about that time you relied on the help of a stranger for a jump?</b><br/> Use RoadRate to publically acknowledge how impactful the kindness of strangers can be.</p>
            <h4>Registered users of RoadRate can leave/recieve anonymous tips for enviable driving skills and random acts of kindness.</h4>
            <h3>Log in or register to start your RoadRating!</h3>
            <ul className="about-links">
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

export default About;