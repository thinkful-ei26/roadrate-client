import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import icon from '../assets/thumbs-up.png';
import '../styles/about.css';

// ReactModal.setAppElement('#root')

export const About = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const onClose = () => setModalOpen(false);

    const clickOutside = (ref, onClose) => {
        const statusChange = (e) => {
            if (!ref.current.contains(e.target)){
                setModalOpen(modalOpen)
                onClose();
            }
        }
        document.addEventListener('click', statusChange)
        return function cleanup() {
            document.removeEventListener('click', statusChange)
        }
    }

    const Button = () => {    
        return (
          <button className="close" onClick={() => setModalOpen(false)}>x</button>
        )
      }

      const AboutModal = ({ title, onClose }) => {
        const modalRef = useRef(null);
  
        useEffect(() => clickOutside(modalRef, onClose))
  
          return (
              <div className="overlay">
                <div className="about-modal">
                    <div className="modal-guts">
                        <h1>{title}</h1>
                        <div className="content" ref={modalRef}>
                            <AboutSection />
                        </div>
                    </div>
                </div>
              </div>
            );
        } 

    const AboutSection = () => {
        return (
            <div className="about" closeTimeoutMS={2000}>
                <img 
                    src={icon} 
                    alt="icon" 
                    className="about-icon"
                />
                <p><b>Have you ever been perplexed by a neighbor that continuously parks in a way that blocks you from using an otherwise perfectly viable space?</b><br/> With RoadRate, you can find their license plate, rate it, leave a review and upload a photo 100% anonymously.</p>
                <p><b>What about that time you relied on the help of a stranger for a jump?</b><br/> Use RoadRate to publically acknowledge how impactful the kindness of strangers can be.</p>
                <p><b>So, what is RoadRate?</b><br />RoadRate is a social platform for reviewing your fellow drivers and seeing how well your own plate's *RoadRate. Register license plates, browse/search/post reviews, and build up your karma score to let other's know you're a great driver. RoadRate was founded to safely and anonymously encourage quality road etiquette for the over 220 million drivers currently licensed in America.</p>
                <h5>*RoadRate encourages positive reviews for enviable driving skills and random acts of kindness, and as such, honest negative reviews where there is room for improvement and need are also encouraged.</h5>
                <div className="register-link">
                    <Link to="/register" className="register-link">
                        <h4>Start your journey with RoadRate today!</h4>
                    </Link>
                    </div>
                <Button />
            </div>
       )
    };

    return (
        <div className='about'>
            <button className="about-button" id="about-button" onClick={() => setModalOpen('about')}>About</button>
            {modalOpen && (
                <AboutModal
                    show={modalOpen === 'about'}
                    toggleModal={setModalOpen}
                    title="About RoadRate"
                    onClose={onClose}
                />
            )}
        </div>
    );
}

export default About;