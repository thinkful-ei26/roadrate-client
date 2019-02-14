import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import LandingPage from './landing-page';
import Plate from './plate';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [search, setSearch] = useState("");
  // const [logout, setLogout] = useState(false);

  useEffect(() => {
    // if (!localStorage.authToken && !localStorage.loggedIn) {
    //   localStorage.loggedIn = false;
    //   setLogout(true)
    //   return <LandingPage />
    // }
    setUsername(localStorage.user)
  }/* , [logout] */)

  // if(!localStorage.authToken && localStorage.logout) {
  //   return <LandingPage />
  // }

  const handleSubmit = e => {
    e.preventDefault(); 
    if (!search ) return;
    console.log('clicked search btn', search)

  }

  return (
    <div className="dashboard">
    <div className="dashboard-greeting">
      <h2>Hello @{username}!</h2>
      <button onClick={() => {
        props.logout()
        // setLogout(false)
        localStorage.setItem("logout", true)
        }
      }>
        Logout
      </button>
      
      {/* ========= SEARCH FORM ========== */}
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
