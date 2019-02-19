import React  from 'react'; 
import { Link } from 'react-router-dom';
// import ReactModal from "react-modal";
// import { useModal }  from 'react-modal-hook';

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

export const Plate = (props) => {

  console.log('plate props: ', props)
  const reviews = props.reviews;
  let review = "Loading Reviews";  let plate;
      if (reviews) {
         review = reviews.map((review, index) => { 
          if (review.plateNumber === props.plateName) {
            plate = <p>{review.plateNumber}</p>
          }})
    };

  return (
    // ==== When a User clicks on a plate link inside the review page, this will render
      <div className="plate">
          <h4 className='plate-number'>{props.location.state.plateNumber
}</h4><br/>
          <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img>
        <div className="karma-wrapper">
          <p className="karma-score">Karma Score: #Number</p>
        </div>
        <p>{review}</p>
        <Link to="/"    className="plates-back-link">
          <button>Go Back</button>
        </Link>
    </div>
  );
};

export default Plate;
