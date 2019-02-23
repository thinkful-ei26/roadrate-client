import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Icon } from 'react-materialize';
import OwnerResponseForm from './owner-response-form';

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

export const MyPlate = () => {
  const [ reviews, setReviews] = useState("");
  const [ plate, setPlate ] = useState("");
  const [ submitResponse, setSubmitResponse] = useState('');
  const [ unclaimMessage, setUnclaimMessage ] = useState('');

  // const fetchReviews = async () => {
  //   let url = `${API_BASE_URL}/reviews/${localStorage.myState}/${localStorage.myPlate}`;
  //   const response = await fetch(url);
  //   const reviews  = await response.json();
  //   setReviews(reviews)
  //   return reviews
  // }

  const fetchReviewsByPlateId = async () => {
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
  }, [reviews]);

   /* ========= UPDATE AN EXISTING PLATE ========== */
  // PUT to link an existing plate to the current user
  const unClaimPlateClick = e => {
    e.preventDefault(e);
    const userId = localStorage.userId;
 
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
      console.log('res inside handleLink >>>', res);
      localStorage.setItem('unclaimedPlate', localStorage.myPlate)
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
        rating = <Icon>thumb_up</Icon>
      } else {
        rating = <Icon>thumb_down</Icon>
      }

      let responseButton;
      if (review.ownerResponse) {
        ownerComment = <p>Driver Response: {review.ownerResponse}</p>
      } else {
        responseButton = <button onClick={() => setSubmitResponse(review._id)}>Leave a response</button>
      }

      let responseForm;
      if (submitResponse === review._id) {
        responseForm = <OwnerResponseForm reviewId={review._id}/>
        responseButton = <button onClick={() => setSubmitResponse('')}>Cancel</button>
      }

      if (review.ownerResponse) {
        responseButton = '';
      }

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

  return (
    <div className="plate">
    {/* ===== CONTROLS ===== */}
      {/* <Link to="/" className="plates-back-link">
        <button>Home</button>
      </Link>
      <Link to="/my-plates" className="plates-back-link">
        <button>My Plates</button>
      </Link> */}

    {/* ===== PLATE DETAILS ===== */} 
      <h4>{localStorage.myPlate}</h4>
      <p>{localStorage.myState}</p>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: {plate.karma}</p>
      </div>

     {/* ===== UNCLAIM A PLATE ===== */} 
     {
      !localStorage.unclaimedPlate ? (<button
        onClick={e => unClaimPlateClick(e)}
      >
        Unclaim {localStorage.myPlate} - {localStorage.myState}
      </button>) : (<p>{unclaimMessage}</p>)
    }
    
    {/* ===== PLATE REVIEW LIST ===== */} 
      <ul className='reviews'>
        {review}
      </ul>
   
    </div>
  );
};

export default MyPlate;