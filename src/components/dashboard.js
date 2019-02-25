import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import ReviewList from './ReviewList';
import '../styles/dashboard.css';
import DashboardNav from './dashboard-nav';
import ReviewForm from './review-form';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId ] = useState("");
  const [name, setName ] = useState("");
  const [ submitReview, setSubmitReview ] = useState(false);
  const [ storePlates, setStorePlates ] = useState([]);

  const storeUser = async (userId, name, storePlates) => {
    const res = await fetch(
      `${API_BASE_URL}/users/?search=${localStorage.user}`
    );

    // Pull out the data from response
    const [ user ] = await res.json();
    
    // Store user info on localStorage
    localStorage.setItem('userId', user.id)
    setUserId(user.id) 
    userId = user.id
    
    localStorage.setItem('name', user.name)
    setName(user.name)
    name = user.name
    
    // Fetch & store plates on local storage
    const getplates = await fetch(`${API_BASE_URL}/plates/all/${user.id}`)
    const plates = await getplates.json();
   
    setStorePlates(plates)
    localStorage.setItem('hasPlates', plates)
    storePlates = plates
   
    return user;
  }

  useEffect(() => {
    setUsername(localStorage.user)
    storeUser(userId, name, storePlates);
    localStorage.removeItem('unclaimedPlate')
    localStorage.removeItem('success')
  }, []);

  console.log('storePlates on dashboard', storePlates)

  let reviewForm;
  if (submitReview === true) {
    reviewForm = <ReviewForm plates={storePlates}/>
  }
 
  return (
    <div className="dashboard">
      <DashboardNav props={props}/>
    { /*
      <div className="dashboard-nav-wrapper">
        <div className="icon">
          {/* <img 
            src={icon} 
            alt="RoadRate icon" 
            className="icon"
          /> 
          <img 
            src={logo} 
            alt="RoadRate logo" 
            className="logo"
          />
        </div>
        <div className="dashboard-nav">
        
          <Link to="/claim-plate"
            className="claim-link"
          >
            <span>
              Claim A Plate
            </span>
          </Link>

          <Link to="/my-plates" 
            className="my-plates-link">
            <span >
              MyPlates
            </span>
          </Link>

          <Link to='/my-reviews' 
            className="my-reviews-link">
            <span >
              My Reviews
            </span>
          </Link>
        </div>
      </div>
    */}
      <div className="dashboard-greeting">
        <p>Hi, {username}!</p>

        <Link to="/">
          <button className="logout" onClick={() => {
            props.logout()
            localStorage.setItem("logout", true)
            }}>
            Logout
          </button>
        </Link >
      </div>

      <button 
        id='review-form-button' 
        onClick={ e => {
          e.preventDefault(); 
          setSubmitReview(!submitReview); 
          }
        }
      >
        Add a review
      </button>

      {reviewForm}
      <ReviewList />
    
    </div> 
  )
}

export default Dashboard;
