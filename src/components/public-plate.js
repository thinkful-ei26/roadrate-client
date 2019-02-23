import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
// import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';

export const PublicPlate = () => {
  const [plate, setPlate] = useState('');
  const [plateId, setPlateId] = useState('');
  // const [ reviews, setReviews] = useState("");
  // const [ plate, setPlate ] = useState("");

  // const fetchPlate = async () => {
  //   console.log('fetchPlate plateId: ', plateId)
  //   let url = `${API_BASE_URL}/plate/${plateId}`;
  //   console.log(url)
  //   const response = await fetch(url);
  //   const data  = await response.json();
  //   console.log('data: ',data);
  //   setPlate(data)

  //   // let reviewsByPlateId = `${API_BASE_URL}/reviews/plate/${plateId}`
    
  //   // const fetchReviews = await fetch(reviewsByPlateId);
  //   // const reviews = await fetchReviews.json();
  //   // setReviews(reviews)
  // }

  const extractPlateId = async () => {
    console.log('address: ',document.location.href);
    const address = document.location.href;
    const plateId = address.substring((address.indexOf('d')+ 2), address.length);
    setPlateId(plateId)
    console.log('plateId from addressbar: ',plateId)
    
    let url = `${API_BASE_URL}/plates/${plateId}`;
    console.log(url)
    const res = await fetch(url);
    const plate  = await res.json();
    console.log('plate: ',plate);
    setPlate(plate)
  }


    // const fetchReviews = async () => {
    //   console.log('fetchReviews plateId: ',plateId)
    //   let url = `${API_BASE_URL}/reviews/plate/${plateId}`;
    //   console.log('fetchReviews url: ', url)
    //   const response = await fetch(url);
    //   const reviews  = await response.json();
    //   setReviews(reviews)
    //   return reviews
    // }

  //   const fetchKarma = async () => {
  //     let url = `${API_BASE_URL}/plates/${localStorage.currentPlateState}/${localStorage.currentPlateNumber}`;
  //     const response = await fetch(url);
  //     const plate  = await response.json();
  //     setPlate(plate[0])
  //     return plate
  //   }

    useEffect(() => {
      extractPlateId()
      // fetchPlate(plateId);
      // fetchReviews();
      // fetchKarma();
    }, []);

  console.log('plate data: ', plate)
  // console.log('reviews: ', reviews)

  let _plate = (
    <div className="spinner" style={{margin: '0 auto'}}>
      <Spinner name="line-spin-fade-loader" color="green"/>
    </div>
  )

    // let rating;
    // let review = (
    //   <div className="spinner" style={{margin: '0 auto'}}>
    //     <Spinner name="line-spin-fade-loader" color="green"/>
    //   </div>
    // )

    // let driverComment;

    // if (reviews) {
    //   review = reviews.map((review, index) => { 
    //     if (review.isPositive === 'true') {
    //       rating = <Icon>thumb_up</Icon>
    //     } else {
    //       rating = <Icon>thumb_down</Icon>
    //     }

    //     if (review.comment) {
    //       driverComment = <p> Driver Response: {review.comment}</p>
    //     } 

    //     const thisDate = new Date();
        
    //     const date = new Date(review.createdAt)
    //     const year = date.getFullYear();
    //     let month = (date.getMonth() + 1).toString();
    //     const day = date.getDate();
    //     let minutes = date.getMinutes();
    //     let hour = date.getHours();

    //     //add 0 for times less than 10
    //     if (minutes < 10) {
    //       minutes = '0' + minutes
    //     }

    //     let hourTime;
    //     hour > 12 ? hourTime = `${hour - 12}:${minutes} PM ` : hourTime = `${hour}:${minutes} AM `
        
    //     //convert month number to month word
    //     switch (month) {
    //       case '1':
    //         month = 'Jan'
    //         break;
    //       case '2':
    //         month = 'Feb'
    //         break;
    //       case '3':
    //         month = 'Mar'
    //         break;
    //       case '4':
    //         month = 'Apr'
    //         break;
    //       case '5':
    //         month = 'May'
    //         break;
    //       case '6':
    //         month = 'Jun'
    //         break;
    //       case '7':
    //         month = 'Jul'
    //         break;
    //       case '8':
    //         month = 'Aug'
    //         break;
    //       case '9':
    //         month = 'Sep'
    //         break;
    //       case '10':
    //         month = 'Oct'
    //         break;
    //       case '11':
    //         month = 'Nov'
    //         break;
    //       case '12':
    //         month = 'Dec'
    //         break;
    //       default:
    //         month = null
    //       }
        
    //     let yearTime = ` - ${day} ${month} ${year}`
    //     const dateString = hourTime + yearTime;

    //     const timePassed = thisDate - date;

    //     let elapsedTime;
    //     const convert = (ms) => {
    //       let d, h, m, s;
    //       s = Math.floor(ms / 1000);
    //       m = Math.floor(s / 60);
    //       s = s % 60;
    //       h = Math.floor(m / 60);
    //       m = m % 60;
    //       d = Math.floor(h / 24);
    //       h = h % 24;

    //       if (d < 1 && h < 1) {
    //         elapsedTime = `${m}m ago`
    //       } else if (d < 1 && h < 2) {
    //         elapsedTime = `${h}hr ago`
    //       } else if (d < 1 && h > 2) {
    //         elapsedTime = `${h}hrs ago`
    //         //this will need to be updated for short months
    //       } else if (d === 1) {
    //         elapsedTime = `${d} day ago`
    //       } else if (d > 1 && d < 31) {
    //         elapsedTime = `${d} days ago`
    //       } else if (d > 31 && d < 62) {
    //         elapsedTime = `1 month ago`
    //       }
    //     };

    //     if (timePassed) {
    //       convert(timePassed)
    //     }

    //     return (
    //       <li className='review-item' key={review._id} tabIndex='0'>
    //         <article className='review-header'>
    //           <article className='review-title'>
    //             <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
    //             <p>{review.plateNumber} {review.plateState}</p>       
    //             {/* <p id='review-time'>{today}</p> */}
    //           </article>
              
    //           <article className='review-rating'>
    //             <p className='rating'>{rating}</p>
    //           </article>
    //         </article>        
    //         <p className='message'>Review: {review.message}</p>
    //         <p>{driverComment}</p>
    //         {dateString}
    //       </li>
    //     )
    //   })
    // };
  
    if(plate){
      console.log('fetching plate: ', plate)
      _plate = (
        <div className="public-plate-wrapper">
          <h2>{plate.plateNumber}</h2>
          <p>State: {plate.plateState}</p>
          <p>Karma Score: {plate.karma}</p>
        </div>
      )
    }

  return (
    // ==== When a User clicks on a plate link inside the review page, this will render
    <div className="plate">
      <Link to="/" className="plates-back-link">
          <button>Go Back</button>
      </Link>
     
      {_plate}
    
      {/* <h4>{localStorage.currentPlateNumber}</h4>
      <p>{localStorage.currentPlateState}</p>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: {plate.karma}</p>
      </div> */}
      {/* <ul className='reviews'>
        {review}
      </ul> */}
    </div>

  );
};

export default PublicPlate;
