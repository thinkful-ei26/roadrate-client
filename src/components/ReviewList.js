import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import Review from './Review';

export const ReviewList = (props) => {

  const REVIEW_URL = 'http://localhost:8080';
   //storing Review Data in State

  //I need to be able to get an array of reviews and set it to the reviews variable below.  I then need to pass reviews as a prop from dashboard to ReviewList so I can map through the data and send those details as props to Review in order to render multiple Reviews at once on the dashboard.
  const [reviews, setReviews] = useState("");
  
  const [plateNumber, setPlateNumber] = useState("");
  const [reviewImg, setReviewImg] = useState("");
  const [isPositive, setIsPositive] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [message, setMessage] = useState("");

    // console.log(props);

    const fetchReviews = async () => {
      let url = `${REVIEW_URL}/reviews`;
      const response = await fetch(url);
      // console.log(response);

      const reviews  = await response.json();

      // console.log('REVIEW LIST >>> ', reviews)

      // localStorage.setItem("isPositive", reviews.isPositive)
      // setIsPositive(reviews.isPositive)
      // localStorage.setItem("message", reviews.message)
      // setMessage(reviews.message)
      // localStorage.setItem("reviews")
      setReviews(reviews)

      return reviews

    }
    
    useEffect(() => {
      fetchReviews();
    }, []);

    return (
        <div className="review-list-div">
          <ul className='review-list'>
            {/* <Review message={props.message}/> 
            <Review /> */}
            <Review reviews={reviews}/>
          </ul>
        </div>
    );
}

export default ReviewList;