import React  from 'react'; 

export const Plate = () => {
  
  return (
    // ==== When a User clicks on a plate link inside the review page, this will render
    <div className="plate">
      <h4>MY PLATE NUMBER</h4>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: #Number</p>
      </div>
      <p>INSERT PLATE REVIEWS COMPONENT</p>
    </div>
  );
}

export default Plate;
