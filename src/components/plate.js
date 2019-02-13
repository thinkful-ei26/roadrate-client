import React from 'react';
import {connect} from 'react-redux';

export function Plate(props) {

    return (
        <div className="plate">
            <h2>PLATE NUMBER</h2>
            <div className="karma-wrapper">
              <p className="karma-score">Karma Score: #Number</p>
            </div>
            <ul className="plate-review-list">
              <li className="plate-review-item">
                <p className="date">Date</p>
                <p className="feedback">Feedback</p>
                <p className="isClaimed">Does the plate have a registered owner? (Bool)</p>
              </li>
              <li className="plate-review-item">
                <p className="date">Date: 2/13/19</p>
                <p className="feedback">He was a great driver!</p>
                <p className="isClaimed">Yes)</p>
              </li>
            </ul>
        </div>
    );
}

const mapStateToProps = state => ({
    state
});

export default connect(mapStateToProps)(Plate);
