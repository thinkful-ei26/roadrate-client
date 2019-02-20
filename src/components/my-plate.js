import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import OwnerResponseForm from './owner-response-form';

// fetch call, get all reviews about that plateid === _id from plate 
// button "comment" on review => comment form
// submit make PUT req to change the specific review

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

export const MyPlate = (props) => {
  const [ reviews, setReviews] = useState("");
  const [ plate, setPlate ] = useState("");
  const [ submitResponse, setSubmitResponse] = useState(false);

  const fetchReviews = async () => {
    let url = `${API_BASE_URL}/reviews/${localStorage.myState}/${localStorage.myPlate}`;
    const response = await fetch(url);
    const reviews  = await response.json();
    console.log(reviews)
    setReviews(reviews)
    return reviews
  }

  const fetchKarma = async () => {
    let url = `${API_BASE_URL}/plates/${localStorage.myState}/${localStorage.myPlate}`;
    const response = await fetch(url);
    const plate  = await response.json();
    setPlate(plate)
    return plate
  }

  useEffect(() => {
    fetchReviews();
    fetchKarma();
  }, []);


  console.log('reviews"', reviews);

  let rating;
  let review;
  let ownerComment;

  // console.log('karma', plate)


  if (reviews) {
    review = reviews.map((review, index) => { 
      console.log(review._id)
      if (review.isPositive === 'true') {
        rating = <Icon>thumb_up</Icon>
      } else {
        rating = <Icon>thumb_down</Icon>
      }

      let responseButton;
      if (review.ownerResponse) {
        ownerComment = <p>Driver Response: {review.ownerResponse}</p>
        responseButton = <p></p>;
      } else {
        responseButton = <button onClick={() => setSubmitResponse(true)}>Leave a response</button>
      }

      let responseForm;
      if (submitResponse) {
        responseForm = <OwnerResponseForm reviewId={review._id}/>
      }

      return (
        <li className='review-item' key={review._id} tabIndex='0'>
          <article className='review-header'>
            <article className='review-title'>
              <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
                {review.plateNumber} {review.plateState}         
              {/* <p id='review-time'>{today}</p> */}
            </article>
            
            <article className='review-rating'>
              <p className='rating'>{rating}</p>
            </article>
          </article>
          {/* <h1 className='plate-number'>{review.plateNumber}</h1><br/> */}
          {/* <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img> */}
          
          {/* Do we want to add information about how long ago this was posted, i.e. 2m or 2h */}
          
          <p className='message'>Review: {review.message}</p>
          {ownerComment}
          {responseButton}
          {submitResponse}
          {responseForm}
        </li>
      )
    })
  };


  return (
    <div className="plate">
      <Link to="/" className="plates-back-link">
          <button>Go Back</button>
      </Link>
      <h4>{localStorage.myPlate}</h4>
      <p>{localStorage.myState}</p>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: {plate.karma}</p>
      </div>
      <ul className='reviews'>
        {review}
        
      </ul>
    </div>

  );
};

export default MyPlate;