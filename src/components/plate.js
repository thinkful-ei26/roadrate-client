import React  from 'react'; 
import { API_BASE_URL } from '../config';

export const Plate = () => {
  
  return (
    <div className="plate">
      <h2>PLATE NUMBER</h2>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: #Number</p>
      </div>
      <p>INSERT PLATE REVIEWS COMPONENT</p>
    </div>
  );
}

export default Plate;