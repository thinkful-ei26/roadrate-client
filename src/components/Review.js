import React, { Component } from 'react';
// import './Review.css'

export default class Review extends Component {
  render() {

    const imgSrc = '/';

    //if an image is uploaded by a user then it will be included in the review, otherwise no image will be displayed
    // if(review.img) {
    //   imgSrc = review.img;
    // }

    return(
      <li className='review'>
        <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
        <h1 className='plate-number'>ABC-1234</h1><br/>
        <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img>
        <p className='rating'>Rating Placeholder</p>
        {/* Do we want to add information about how long ago this was posted, i.e. 2m or 2h */}
        <p className='date'>02/14/19</p>
        <p className='comments'>Review: Driver parked all the way on my side of the line and I couldn't load up my car with my groceries until I pulled into a new spot!</p>
      </li>
    )
  }
}