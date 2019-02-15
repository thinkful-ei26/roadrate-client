import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

import Plate from './plate';
import ReviewList from './ReviewList';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId ] = useState("");
  const [name, setName ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  
  //storing Review Data in State

  //I need to be able to get an array of reviews and set it to the reviews variable below.  I then need to pass reviews as a prop from dashboard to ReviewList so I can map through the data and send those details as props to Review in order to render multiple Reviews at once on the dashboard.
  const [reviews, setReviews] = useState("");
  
  const [plateNumber, setPlateNumber] = useState("");
  const [reviewImg, setReviewImg] = useState("");
  const [isPositive, setIsPositive] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");
  
    const call = async () => {
      const res = await fetch(
        `${API_BASE_URL}/users/?search=${localStorage.user}`
      );

      console.log(`${API_BASE_URL}/users/?search=${localStorage.user}`)
      // Pull out the data as usual
      const [ user ] = await res.json();

      console.log('JSON: ', user)
      
      localStorage.setItem("", user.id)
      setUserId(user.id)
      localStorage.setItem("name", user.name)
      setName(user.name)
      
      return user;
    }

    useEffect( () => {
      setUsername(localStorage.user)
      call()
    }, [])

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews`;
      const response = await fetch(url);
      console.log(response);

      const [ reviews ] = await response.json();

      console.log('JSON >>> ', reviews)

      localStorage.setItem("isPositive", reviews.isPositive)
      setIsPositive(reviews.isPositive)
      localStorage.setItem("message", reviews.message)
      setMessage(reviews.message)
      // localStorage.setItem("reviews")

      return reviews

    }
    
    useEffect(() => {
      fetchReviews();
    }, []);

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!searchInput ) return;
    console.log('clicked search btn', searchInput)

  }

  return (
    <div className="dashboard">
    <div className="dashboard-greeting">
      <h2>{localStorage.name}'s Dashboard</h2>
      <p>@{localStorage.user}</p>
      <Link to="/">
        <button onClick={() => {
          props.logout()
          localStorage.setItem("logout", true)
          }
        }>
          Logout
        </button>
      </Link>
      
      {/* ========= SEARCH FORM - move to REVIEWS COMPONENT ========== */}
      <br/>
      <br />
      <div className="search-section">
        <form 
          id="search-form"
          className="search-form"
          onSubmit={handleSubmit}
        >
          <div className="input-wrapper">
            <input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              type="search"
              id="search"
              name="search"
              className="search-input"
              placeholder="Search..."
            />
            <label 
              htmlFor="search"
              className="search-label"
              aria-label="search-form"
            >
              <button
                className="search-btn" 
                aria-label="search-btn"
              >
                search
              </button>
            </label>
          </div>
        </form>
      </div>

      <Plate/>
      <ReviewList message={message}/>

    </div>
    </div> 
  )
}

export default Dashboard;
