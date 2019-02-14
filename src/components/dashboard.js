import React, {useState, useEffect} from 'react';
import ReviewForm from './review-form';

import { Link } from 'react-router-dom';
import Plate from './plate';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // ways to find the correct plate:
    // 1. on login & dashboard load, make a fetch userObj to server => save user info to localStorage (id, username) => use localStorage id to get item from server
    //  - OR -
    // 2. to access reviews, send jwttoken to backend & server will decode the info to acces
    setUsername(localStorage.user)
  })

  console.log('dashboard props: ', props)

  console.log(localStorage.user);
  const handleSubmit = e => {
    e.preventDefault(); 
    if (!search ) return;
    console.log('clicked search btn', search)

  }

  return (
    <div className="dashboard">
    <div className="dashboard-greeting">
      <ReviewForm />
      <h2>Hello @{username}!</h2>
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
              value={search}
              onChange={e => setSearch(e.target.value)}
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
