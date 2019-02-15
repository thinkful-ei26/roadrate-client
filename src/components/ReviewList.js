import React from 'react';
import {connect} from 'react-redux';
import Review from './Review';

export const ReviewList = (props) => {

    console.log(props);

    return (
        <div className="review-list-div">
          <ul className='review-list'>
            <Review message={props.message}/> 
            <Review />
            <Review />
          </ul>
        </div>
    );
}

export default ReviewList;