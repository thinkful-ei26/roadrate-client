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

  // let selectorOptions = props.options.map( (option, index) => {
  //   return (
  //      <option key={index} value={Object.keys(option)[0]}>
  //         {Object.values(option)[0]}
  //      </option>
  //    )
  //  })

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
      <Plate/>
      <ReviewList />

    </div>
    </div> 
  )
}

export default Dashboard;
