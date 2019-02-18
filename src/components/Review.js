import React, {Component, useState, useEffect} from 'react';
import { API_BASE_URL } from '../config.js';
import { Link } from 'react-router-dom';
import Plate from './plate';
// import './Review.css'

export const Review = (props) => {

    const imgSrc = '/';
    //if an image is uploaded by a user then it will be included in the review, otherwise no image will be displayed
    // if(review.img) {
    //   imgSrc = review.img;
    // }

    const reviews = props.reviews;
    console.log('props on Review component: ', reviews);
    
    //Setting the time up for todays date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = `${mm}/${dd}/${yyyy}`

    /* ========= LIST ALL REVIEWS BY MAPPING ========== */

    let review = "Loding Reviews";
    if (reviews) {
       review = reviews.map( (review, index) => (
        // console.log(review)
      <li className='review' key={review._id} tabIndex='0'>
        <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
        <h1 className='plate-number'>ABC-1234</h1><br/>
        <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img>
        <p className='rating'>Rating Placeholder</p>
        {/* Do we want to add information about how long ago this was posted, i.e. 2m or 2h */}
        <p className='time'>{today}</p>
        <p className='message'>Review: {review.message}</p>
        <p className='date'>{Date.now()}</p>
      </li>
      ));
    };

    return(
      <div className='review-container'>
        {review}
      </div>
    )
}

export default Review;