import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import OwnerResponseForm from './owner-response-form';

export const MyPlate = () => {
  const [ reviews, setReviews] = useState("");
  const [ plate, setPlate ] = useState("");
  const [ submitResponse, setSubmitResponse] = useState('');
  const [ unclaimMessage, setUnclaimMessage ] = useState('');
  const [ responseSubmitted, setResponseSubmitted ] = useState(false);

  // const fetchReviews = async () => {
  //   let url = `${API_BASE_URL}/reviews/${localStorage.myState}/${localStorage.myPlate}`;
  //   const response = await fetch(url);
  //   const reviews  = await response.json();
  //   setReviews(reviews)
  //   return reviews
  // }

  const fetchReviewsByPlateId = async () => {
    console.log('fetch reviews by ID clicked')
    let url = `${API_BASE_URL}/reviews/my-plates/${localStorage.myPlateId}`;
    const response = await fetch(url);
    const reviews  = await response.json();
    setReviews(reviews)
    return reviews
  }

  const fetchKarma = async () => {
    let url = `${API_BASE_URL}/plates/${localStorage.myState}/${localStorage.myPlate}`;
    const response = await fetch(url);
    const [ plate ]  = await response.json();
    setPlate(plate)
    return plate
  }

  useEffect(() => {
    // fetchReviews();
    fetchReviewsByPlateId()
    fetchKarma();
  }, []);

  console.log('revoews', reviews);
  console.log('plate', plate);

   /* ========= UPDATE AN EXISTING PLATE ========== */
  // PUT to link an existing plate to the current user
  const unClaimPlateClick = e => {
    e.preventDefault(e);
    const userId = localStorage.userId;
 
    localStorage.setItem('unclaimedPlate', localStorage.myPlate)

    return fetch(`${API_BASE_URL}/plates/unclaim/${localStorage.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        userId,
        plateNumber: localStorage.myPlate,
        plateState: localStorage.myState
      })
    })
    .then(res => {
      // console.log('res inside handleLink >>>', res);
      localStorage.setItem('success', 'unclaimed')
      setUnclaimMessage(`You successfully unclaimed your plate.`)
      return res.json();
    })
    .catch(err => console.log(err))
  }

  let rating;
  let review;
 
  if (reviews) {
    review = reviews.map((review, index) => { 
      let ownerComment;
      if (review.isPositive === 'true') {
        rating = <MaterialIcon icon="thumb_up" />
      } else {
        rating = <MaterialIcon icon="thumb_down" />
      }
 
      let responseButton;

      console.log(review.ownerResponse)

      if (review.ownerResponse) {
        ownerComment = <p>Driver Response: {review.ownerResponse}</p>
      } else {
        responseButton = <button onClick={() => {
          localStorage.setItem('submitResponse', review._id);
          setSubmitResponse(review._id)
        }       
      }>Leave a response</button>
      }

      let responseForm;
      if (localStorage.submitResponse === review._id) {
        console.log('here', localStorage.submitResponse, 'review Id', review._id)
        responseForm = <OwnerResponseForm reviewId={review._id} fetchReviews={fetchReviewsByPlateId()}/>
        // responseButton = '';
        responseButton = <button onClick={() => {
          localStorage.removeItem('submitResponse')
          setSubmitResponse('')}
        }>Cancel</button>
      } 
      // else {
      //   console.log('here', localStorage.submitResponse, 'review Id', review._id)
      //   responseForm = '';
      // }
     

      return (
        <li className='review-item' key={index} id={review.id} tabIndex='0'>
          <article className='review-header'>
            <article className='review-title'>
              <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
                {review.plateNumber} {review.plateState}         
            </article>
            
            <article className='review-rating'>
              <p className='rating'>{rating}</p>
            </article>
          </article>
          
          <p className='message'>Review: {review.message}</p>
          {ownerComment}
          {responseButton}
          {responseForm}
        </li>
      )
    })
  };

  console.log(unclaimMessage)

  return (
    <div className="plate">
    <Link to="/my-plates" className="claim-back-link"> Go Back </Link>
    <Link to="/"
        className="my-plates-home-link"
      >
        Home
      </Link>

    {/* ===== PLATE DETAILS ===== */} 
      <h4>{localStorage.myPlate}</h4>
      <p>{localStorage.myState}</p>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: {plate.karma}</p>
      </div>

    {/* ===== UNCLAIM A PLATE ===== */} 
      {
        !localStorage.unclaimedPlate ? (
          <button
            onClick={e => unClaimPlateClick(e)}
            disabled={localStorage.success === 'unclaimed'}
          >
            Unclaim {localStorage.myPlate} - {localStorage.myState}
          </button>
        ) : (<p></p>)
      }

      {
        unclaimMessage ? (<p>{unclaimMessage}</p>) : (<p></p>)
      }

    {/* ===== PLATE REVIEW LIST ===== */} 
      <ul className='reviews'>
        {review}
      </ul>
   
    </div>
  );
};

export default MyPlate;