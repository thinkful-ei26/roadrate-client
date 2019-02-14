import React, {useState, useEffect} from 'react';
import ReviewForm from './review-form';

import { Link } from 'react-router-dom';
import Plate from './plate';
import { API_BASE_URL } from '../config';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId ] = useState("");
  const [name, setName ] = useState("");
  const [searchInput, setSearchInput] = useState("");
  
    // Use an async function so that we can await the fetch
    useEffect(async () => {
      setUsername(localStorage.user)
      // Call fetch as usual
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
    
    }, []);
  

  console.log('dashboard props: ', props)

  console.log(localStorage.user);
  const handleSubmit = e => {
    e.preventDefault(); 
    if (!searchInput ) return;
    console.log('clicked search btn', searchInput)

  }

  return (
    <div className="dashboard">
    <div className="dashboard-greeting">
      <ReviewForm />
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

    </div>
    </div> 
  )
}

export default Dashboard;
