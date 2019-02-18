import ReviewForm from './review-form';
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

  // let selectorOptions = props.options.map( (option, index) => {
  //   return (
  //      <option key={index} value={Object.keys(option)[0]}>
  //         {Object.values(option)[0]}
  //      </option>
  //    )
  //  })

  console.log('////', submitReview);
  let reviewForm;
  if (submitReview === true) {
    reviewForm = <ReviewForm />
  }
 
  return (
    <div className="dashboard">
    <div className="dashboard-greeting">
      <h2>Hello @{username}!</h2>
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
        <button id='review-form-button' 
        onClick={(e) => {
          e.preventDefault(); 
          setSubmitReview(!submitReview); 
        }}>
          Add a review
        </button>

      </Link>

      {reviewForm}
      
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
      <ReviewList />

    </div>
    </div> 
  )
}

export default Dashboard;
