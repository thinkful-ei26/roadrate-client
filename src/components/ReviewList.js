import React from 'react';
import {connect} from 'react-redux';
import Review from './Review';

export function ReviewList(props) {

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

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(ReviewList);