import React, { useState, useEffect } from 'react'; 
import API_BASE_URL from '../config';
// import { Link } from 'react-router-dom';

export const MyPlate = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useState("")
    const [loggedIn, SetLoggedIn] = useState(true)
    
    const review = async () => {
        const res = await fetch(
          `${API_BASE_URL}/reviews/?search=${localStorage.user}`
        );
  
        console.log(`${API_BASE_URL}/reviews/?search=${localStorage.user}`)
        // Pull out the data as usual
        const [ user ] = await res.json();
  
        console.log('JSON: ', user)
        
        // localStorage.setItem("userId", user.id)
        // setUserId(user.id) 
        // localStorage.setItem("name", user.name)
        // setName(user.name)
        
        return user;
      }
  
      useEffect(() => {
        setUsername(localStorage.user)
        review();
      }, []);

    // console.log('plate props: ', props)
    // // const reviews = props.reviews;
    // let reviews;
    // let review = "Loading Reviews";  
    //     if (reviews) {
    //        review = reviews.map((review, index) => { 
    //         if (review.plateNumber === props.plateName) {
    //           plate = <p>{review.plateNumber}</p>
    //         }})
    //   };

return (
    <div className="plate">
        <h4>{props.plateName}</h4>
        <div className="karma-wrapper">
          <p className="karma-score">Karma Score: #Number</p>
        </div>
        <p>{review}</p>
        {/* <Link to="/" className="plates-back-link">
          <button>Go Back</button>
        </Link> */}
    </div>
)
}

export default MyPlate;