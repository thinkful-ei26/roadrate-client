import ReviewForm from './review-form';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../styles/dashboard.css';

import Plate from './plate';
import ReviewList from './ReviewList';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId ] = useState("");
  const [name, setName ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [ submitReview, setSubmitReview ] = useState(false);

    const call = async () => {
      const res = await fetch(
        `${API_BASE_URL}/users/?search=${localStorage.user}`
      );

      console.log(`${API_BASE_URL}/users/?search=${localStorage.user}`)
      // Pull out the data as usual
      const [ user ] = await res.json();

      console.log('JSON: ', user)
      
      localStorage.setItem("userId", user.id)
      setUserId(user.id) 
      localStorage.setItem("name", user.name)
      setName(user.name)
      
      return user;
    }

    useEffect(() => {
      setUsername(localStorage.user)
      call();
    }, []);

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!searchInput ) return;
    console.log('clicked search btn', searchInput)
  }

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

      <Link to="/claim-plate">
        <button>Claim A Plate</button>
      </Link>

      <button id='review-form-button' 
        onClick={(e) => {
        e.preventDefault(); 
        setSubmitReview(!submitReview); 
        }}>
        Add a review
      </button>
     
      {reviewForm}
      <Plate/>
      <ReviewList />
    
    </div> 
  )
}

export default Dashboard;
