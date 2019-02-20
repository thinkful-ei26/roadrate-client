import ReviewForm from './review-form';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../styles/dashboard.css';
import ReviewList from './ReviewList';

export const Dashboard = (props) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId ] = useState("");
  const [name, setName ] = useState("");
  const [ submitReview, setSubmitReview ] = useState(false);
  const [ storePlates, setStorePlates ] = useState([]);

  const fetchPlates = async (storePlates) => {
    let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
    console.log(url)
    const response = await fetch(url);
    const plates = await response.json();
    console.log('plateS on fetchPlates', plates)
    setStorePlates(plates)
    storePlates = setStorePlates(plates)
    return plates
  }

  useEffect(() => {
    fetchPlates(storePlates);
  }, []);

  console.log('store pLATES',storePlates)

    const storeUser = async () => {
      const res = await fetch(
        `${API_BASE_URL}/users/?search=${localStorage.user}`
      );
      // Pull out the data as usual
      const [ user ] = await res.json();

      // console.log('JSON: ', user)
      
      localStorage.setItem("userId", user.id)
      setUserId(user.id) 
      localStorage.setItem("name", user.name)
      setName(user.name)
      
      return user;
    }

    useEffect(() => {
      setUsername(localStorage.user)
      storeUser();
    }, []);

  // const handleSubmit = e => {
  //   e.preventDefault(); 
  //   if (!searchInput ) return;
  //   console.log('clicked search btn', searchInput)
  // }

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
          {/* <a class="waves-effect waves-teal btn-flat" onClick={() => {
            props.logout()
            localStorage.setItem("logout", true)
            }}>Logout</a> */}
        </Link >
      </div>
      <Link to="/create-plate">
        <button>Register A New Plate</button>
      </Link>
      <Link to="/claim-plate">
        <button>Claim An Existing Plate</button>
      </Link>

      {/* RENDER MY PLATES BTN if a user has a plate
      { localStorage.myPlate && localStorage.myState ? (
        <Link to="/my-plates">
          <button>MyPlates</button>
        </Link>
      ) : ( <p>No plates associated</p> )} */}

      { storePlates.length >= 0 ? (
        <Link to="/my-plates">
          <button>MyPlates</button>
        </Link>
      ) : ( <p>No plates associated</p> )}

      <Link to='/my-reviews'>
        <button>My Reviews</button>
      </Link>

      <button id='review-form-button' 
        onClick={(e) => {
        e.preventDefault(); 
        setSubmitReview(!submitReview); 
        }}>
        Add a review
      </button>
    
      {reviewForm}
      <ReviewList />
    
    </div> 
  )
}

export default Dashboard;
