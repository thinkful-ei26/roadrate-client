import ReviewForm from './review-form';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import ReviewList from './ReviewList';
import '../styles/dashboard.css';

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
  }, []);

  console.log('storePlates on dashboard', storePlates)

  console.log('////', submitReview);
  let reviewForm;
  if (submitReview === true) {
    reviewForm = <ReviewForm />
  }
 
  return (
    <div className="dashboard">
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

      <div className="dashboard-nav">
        <Link to="/create-plate">
          <button>Register A New Plate</button>
        </Link>

        <Link to="/claim-plate">
          <button>Claim An Existing Plate</button>
        </Link>

        <Link to="/plate-list">
          <button>MyPlates</button>
        </Link>

        <Link to='/my-reviews'>
          <button>My Reviews</button>
        </Link>
        
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

      </div>
      

      {reviewForm}
      <ReviewList />
    
    </div> 
  )
}

export default Dashboard;
