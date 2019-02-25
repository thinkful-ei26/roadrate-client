import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';
import { Icon } from 'react-materialize';
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
        rating = <Icon>thumb_up</Icon>
      } else {
        rating = <Icon>thumb_down</Icon>
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


// import React, { useState, useEffect }  from 'react'; 
// import {API_BASE_URL} from '../config';
// import { Redirect, Link } from 'react-router-dom';
// import '../styles/my-plates.css'

// export const MyPlatesList = () => {
//   const [ plates, setPlates ] = useState([]);
//   const [ redirect, setRedirect ] = useState(false);

//   const fetchPlates = async () => {
//     let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
//     // console.log('fetching Plates on: ',url)
//     const response = await fetch(url);
//     const plates = await response.json();
//     // console.log('plateS on fetchPlates', plates)
//     setPlates(plates)
//     return plates
//   }

//   useEffect(() => {
//     fetchPlates();
//     setRedirect(false)
//     localStorage.removeItem('responseSuccess')
//     localStorage.removeItem('unclaimedPlate')
//   }, []);

//   // console.log('plates', plates);
//   /* plate is still fetching/loading */
//   let plate;



//   const myPlateClick = (plate) => {
//     // console.log('plate inside li',plate)
//     localStorage.setItem('myPlate', plate.plateNumber)
//     localStorage.setItem('myState', plate.plateState)
//     localStorage.setItem('myPlateId', plate.id)
//     localStorage.removeItem('success')
//     setRedirect(true);
//     return plate
//   }
  
//   let plateEndpoint = `/my-plates/id/${localStorage.myPlateId}`;

//   if (redirect) {
//     return <Redirect to={plateEndpoint} />
//   }

//   const noPlatesMessage = () => {
//     if(localStorage.hasPlates === '' || !plates) {
//       return (
//         <p>No plates associated</p>
//       )
//     }
//     return (
//       <p>Total Plates Owned: {plates.length}</p>
//     )
//   }

//    if (plates) {
//     plate = plates.map((plate, index) => { 
//       return (
//         <li className='plate-item' key={index} tabIndex='0'>
//           <div className='plate-wrapper'>
//             <button 
//               className="plate"
//               onClick={ () => myPlateClick(plate) }
//             >
//               {plate.plateNumber} - {plate.plateState}
//             </button>
//           </div>
//         </li>
//       )
//     })
//   };

//   return (
//     <div className="my-plates">
//       <Link to="/"
//         className="my-plates-back-link"
//       >
//         Go Back
//       </Link>

//       {localStorage.unclaimedPlate ? (<p>Successfully unclaimed plate</p>) : (<p></p>)}

//       <h2>My Plates</h2>
//       {noPlatesMessage()}
      
//       <ul className='plates'>
//         {/* <Link to={plateEndpoint}>
//           {plate}
//         </Link> */}
//         {plate}
//       </ul>

//     </div>

//   );
// };

// export default MyPlatesList;

// // import React, { useState, useEffect }  from 'react'; 
// // import {API_BASE_URL} from '../config';
// // import { Redirect, Link } from 'react-router-dom';
// // import '../styles/my-plates.css'

// // export const MyPlatesList = () => {
// //   const [ plates, setPlates ] = useState([]);
// //   const [ redirect, setRedirect ] = useState(false);

// //   const fetchPlates = async () => {
// //     let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
// //     // console.log('fetching Plates on: ',url)
// //     const response = await fetch(url);
// //     const plates = await response.json();
// //     // console.log('plateS on fetchPlates', plates)
// //     setPlates(plates)
// //     return plates
// //   }

// //   useEffect(() => {
// //     fetchPlates();
// //     setRedirect(false)
// //     localStorage.removeItem('responseSuccess')
// //     localStorage.removeItem('unclaimedPlate')
// //   }, []);

// //   // console.log('plates', plates);
// //   /* plate is still fetching/loading */
// //   let plate;



// //   const myPlateClick = (plate) => {
// //     // console.log('plate inside li',plate)
// //     localStorage.setItem('myPlate', plate.plateNumber)
// //     localStorage.setItem('myState', plate.plateState)
// //     localStorage.setItem('myPlateId', plate.id)
// //     localStorage.removeItem('success')
// //     setRedirect(true);
// //     return plate
// //   }
  
// //   let plateEndpoint = `/my-plates/id/${localStorage.myPlateId}`;

// //   if (redirect) {
// //     return <Redirect to={plateEndpoint} />
// //   }

// //   const noPlatesMessage = () => {
// //     if(localStorage.hasPlates === '' || !plates) {
// //       return (
// //         <p>No plates associated</p>
// //       )
// //     }
// //     return (
// //       <p>Total Plates Owned: {plates.length}</p>
// //     )
// //   }

// //    if (plates) {
// //     plate = plates.map((plate, index) => { 
// //       return (
// //         <li className='plate-item' key={index} tabIndex='0'>
// //           <div className='plate-wrapper'>
// //             <button 
// //               className="plate"
// //               onClick={ () => myPlateClick(plate) }
// //             >
// //               {plate.plateNumber} - {plate.plateState}
// //             </button>
// //           </div>
// //         </li>
// //       )
// //     })
// //   };

// //   return (
// //     <div className="my-plates">
// //       <Link to="/"
// //         className="my-plates-back-link"
// //       >
// //         Go Back
// //       </Link>

// //       {localStorage.unclaimedPlate ? (<p>Successfully unclaimed plate</p>) : (<p></p>)}

// //       <h2>My Plates</h2>
// //       {noPlatesMessage()}
      
// //       <ul className='plates'>
// //         {/* <Link to={plateEndpoint}>
// //           {plate}
// //         </Link> */}
// //         {plate}
// //       </ul>

// //     </div>

// //   );
// // };

// // export default MyPlatesList;