import React from 'react';
import { Link } from 'react-router-dom';
import ReactModal from "react-modal";
import { Button, Icon } from 'react-materialize';
import { useModal }  from 'react-modal-hook';

ReactModal.setAppElement('#root')

export const About = () => {

    const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen closeTimeoutMS={2000}>
            <div className="about">
                    <h1>What is RoadRate?</h1>
                    <h5><i>RoadRate was founded to safely and anonymously encourage quality road etiquette for the over 220 million drivers currently licensed in America.</i></h5>
                    <p><b>Have you ever been perplexed by a neighbor that continuously parks in a way that blocks you from using an otherwise perfectly viable space?</b><br/> With RoadRate, you can find their license plate, rate it, leave a review and upload a photo 100% anonymously.</p>
                    <p><b>What about that time you relied on the help of a stranger for a jump?</b><br/> Use RoadRate to publically acknowledge how impactful the kindness of strangers can be.</p>
                    <h5>Registered users of RoadRate can leave/recieve anonymous tips for enviable driving skills and random acts of kindness.</h5>
                    <h4>Login or register to begin RoadRating today!</h4>
                    {/* <ul className="about-links">
                        <li className="login-link">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="register-link">
                            <Link to="/register">Register</Link>
                        </li>
                        <li className="ladning-link">
                            <Link to="/">Home</Link>
                        </li>
                    </ul> */}
                <Button onClick={hideModal}>Close</Button>
            </div>
        </ReactModal>
    ));

    return (
        <button onClick={showModal}>About RoadRate</button>
    );
}

export default About;