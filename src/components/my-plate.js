import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';

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
    
    // const review = async () => {
    //     const res = await fetch(
    //       `${API_BASE_URL}/reviews/?search=${localStorage.user}`
    //     );
  
    //     console.log(`${API_BASE_URL}/reviews/?search=${localStorage.user}`)
    //     // Pull out the data as usual
    //     const [ user ] = await res.json();
  
    //     console.log('JSON: ', user)
        
    //     // localStorage.setItem("userId", user.id)
    //     // setUserId(user.id) 
    //     // localStorage.setItem("name", user.name)
    //     // setName(user.name)
        
    //     return user;
    //   }
  
    //   useEffect(() => {
    //     setUsername(localStorage.user)
    //     review();
    //   }, []);

    // console.log('plate props: ', props)
    // // const reviews = props.reviews;
    // let reviews;
    // let review = "Loading Reviews";  
    //     if (reviews) {
    //        review = reviews.map((review, index) => { 
    //         if (review.plateNumber === props.plateName) {
    //           plate = <p>{review.plateNumber}</p>
    //         }})
    //   };

// return (
//     <div className="my-plate">
//      <Link to="/" className="plates-back-link">
//         <button>Go Back</button>
//       </Link>
//       <h2>My Plate</h2>
//         {/* <h4>{props.plateName}</h4>
//         <div className="karma-wrapper">
//           <p className="karma-score">Karma Score: #Number</p>
//         </div> */}
//         {/* <p>{review}</p> */}
//         {/* <Link to="/" className="plates-back-link">
//           <button>Go Back</button>
//         </Link> */}
//     </div>
// )
// }

// console.log(localStorage.currentPlateState)
  // console.log(localStorage.currentPlateNumber)

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
    setPlate(plate[0])
    return plate
  }

  useEffect(() => {
    fetchReviews();
    fetchKarma();
  }, []);


  console.log('reviews"', reviews);

  let rating;
  let review;
  let driverComment;

  // console.log('karma', plate)

  if (reviews) {
    review = reviews.map((review, index) => { 
      if (review.isPositive === 'true') {
        rating = <Icon>thumb_up</Icon>
      } else {
        rating = <Icon>thumb_down</Icon>
      }

      if (review.comment) {
        driverComment = <p> Driver Response: {review.comment}</p>
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
          <p>{driverComment}</p>
        </li>
      )
    })
  };


return (
  // ==== When a User clicks on a plate link inside the review page, this will render
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