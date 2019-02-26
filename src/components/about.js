import React from 'react';
import ReactModal from "react-modal";
import { useModal }  from 'react-modal-hook';

ReactModal.setAppElement('#root')

// const customStyles = { content : { 
//     top : '50%', left : '50%', right : 'auto',bottom : 'auto',marginRight : '-50%',transform : 'translate(-50%, -50%)' } };

export const About = () => {

    const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen closeTimeoutMS={2000} /* style={customStyles} */>
            <div className="about">
                    <h1>What is RoadRate?</h1>
                    <h5><i>RoadRate was founded to safely and anonymously encourage quality road etiquette for the over 220 million drivers currently licensed in America.</i></h5>
                    <p><b>Have you ever been perplexed by a neighbor that continuously parks in a way that blocks you from using an otherwise perfectly viable space?</b><br/> With RoadRate, you can find their license plate, rate it, leave a review and upload a photo 100% anonymously.</p>
                    <p><b>What about that time you relied on the help of a stranger for a jump?</b><br/> Use RoadRate to publically acknowledge how impactful the kindness of strangers can be.</p>
                    <h5>Registered users of RoadRate can leave/recieve anonymous tips for enviable driving skills and random acts of kindness.</h5>
                    <h4>Login or register to begin RoadRating today!</h4>
                <button onClick={hideModal}>Close</button>
            </div>
        </ReactModal>
    ));

    return (
        <button id="about-btn" onClick={showModal}>What's RoadRate?</button>
    );
}

export default About;