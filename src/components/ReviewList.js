import React from 'react';
import {connect} from 'react-redux';
import Review from './Review';

export const ReviewList = () => {

    return (
        <div className="review-list-div">
          <ul className='review-list'>
            <Review /> 
            <Review />
            <Review />
          </ul>
        </div>
    );
}

export default ReviewList;