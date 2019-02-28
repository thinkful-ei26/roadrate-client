import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';
import ReviewList from './ReviewList';
import DashboardNav from './dashboard-nav';
import '../styles/dashboard.css';
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

  let reviewForm;
  if (submitReview === true) {
    reviewForm = <ReviewForm plates={storePlates}/>
  }
 
  return (
    <div className="dashboard">
      <div className="logout-div">
        <Link to="/" id='logout-link'>
            <button className="logout" onClick={() => {
              props.logout()
              localStorage.setItem("logout", true)
              }}>
              Logout
            </button>
        </Link >
      </div>

      <div className="dashboard-nav"> 
        <DashboardNav />
        <div className="dashboard-greeting">
          <p className="greeting-text">Hi, {username}!</p>
        </div>
        <button 
            className="add-review"
            onClick={ e => {
                e.preventDefault(); 
                setSubmitReview(!submitReview); 
              }
            }>
            <span className="new-review">New Review</span>
        </button>
      </div>
      

      {reviewForm}
      <ReviewList />
    
    </div> 
  )
}

export default Dashboard;
