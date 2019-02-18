import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Review from './Review';

import '../styles/review-list.css';

export const ReviewList = (props) => {
   //storing Review Data in State

  //I need to be able to get an array of reviews and set it to the reviews variable below.  I then need to pass reviews as a prop from dashboard to ReviewList so I can map through the data and send those details as props to Review in order to render multiple Reviews at once on the dashboard.
  const [reviews, setReviews] = useState("");

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews`;
      const response = await fetch(url);
      const reviews  = await response.json();
      console.log(reviews)
      setReviews(reviews)
      return reviews
    }
    
    useEffect(() => {
      fetchReviews();
    }, []);

    return (
        <div className="review-list-div">
          <ul className='review-list'>
            <Review reviews={reviews}/>
          </ul>
        </div>
    );
}

export default ReviewList;