import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import Review from './Review';
import MaterialIcon, {colorPalette} from 'material-icons-react';
import { Link } from 'react-router-dom';

export const Plate = (props) => {
  const [ reviews, setReviews] = useState("");
  const [ plate, setPlate ] = useState("");

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews/${localStorage.currentPlateState}/${localStorage.currentPlateNumber}`;
      const response = await fetch(url);
      const reviews  = await response.json();
      setReviews(reviews)
      return reviews
    }

    const fetchKarma = async () => {
      let url = `${API_BASE_URL}/plates/${localStorage.currentPlateState}/${localStorage.currentPlateNumber}`;
      const response = await fetch(url);
      const plate  = await response.json();
      setPlate(plate[0])
      return plate
    }

    useEffect(() => {
      fetchReviews();
      fetchKarma();
    }, []);

    let rating;
    let review;
    let driverComment;

    if (reviews) {
      review = reviews.map((review, index) => { 
        if (review.isPositive === 'true') {
          rating = <MaterialIcon icon="thumb_up" />
        } else {
          rating = <MaterialIcon icon="thumb_down" />
        }

        if (review.comment) {
          driverComment = <p> Driver Response: {review.comment}</p>
        } 

        const thisDate = new Date();
        
        const date = new Date(review.createdAt)
        const year = date.getFullYear();
        let month = (date.getMonth() + 1).toString();
        const day = date.getDate();
        let minutes = date.getMinutes();
        let hour = date.getHours();

        //add 0 for times less than 10
        if (minutes < 10) {
          minutes = '0' + minutes
        }

        let hourTime;
        hour > 12 ? hourTime = `${hour - 12}:${minutes} PM ` : hourTime = `${hour}:${minutes} AM `
        
        //convert month number to month word
        switch (month) {
          case '1':
            month = 'Jan'
            break;
          case '2':
            month = 'Feb'
            break;
          case '3':
            month = 'Mar'
            break;
          case '4':
            month = 'Apr'
            break;
          case '5':
            month = 'May'
            break;
          case '6':
            month = 'Jun'
            break;
          case '7':
            month = 'Jul'
            break;
          case '8':
            month = 'Aug'
            break;
          case '9':
            month = 'Sep'
            break;
          case '10':
            month = 'Oct'
            break;
          case '11':
            month = 'Nov'
            break;
          case '12':
            month = 'Dec'
            break;
          default:
            month = null
          }
        
        let yearTime = ` - ${day} ${month} ${year}`
        const dateString = hourTime + yearTime;

        const timePassed = thisDate - date;

        let elapsedTime;
        const convert = (ms) => {
          let d, h, m, s;
          s = Math.floor(ms / 1000);
          m = Math.floor(s / 60);
          s = s % 60;
          h = Math.floor(m / 60);
          m = m % 60;
          d = Math.floor(h / 24);
          h = h % 24;

          if (d < 1 && h < 1) {
            elapsedTime = `${m}m ago`
          } else if (d < 1 && h < 2) {
            elapsedTime = `${h}hr ago`
          } else if (d < 1 && h > 2) {
            elapsedTime = `${h}hrs ago`
            //this will need to be updated for short months
          } else if (d === 1) {
            elapsedTime = `${d} day ago`
          } else if (d > 1 && d < 31) {
            elapsedTime = `${d} days ago`
          } else if (d > 31 && d < 62) {
            elapsedTime = `1 month ago`
          }
        };

        if (timePassed) {
          convert(timePassed)
        }


        return (
          <li className='review-item' key={review._id} tabIndex='0'>
            <article className='review-header'>
              <article className='review-title'>
                <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
                <p>{review.plateNumber} {review.plateState}</p>       
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
            {dateString}
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
      <h4>{localStorage.currentPlateNumber}</h4>
      <p>{localStorage.currentPlateState}</p>
      <div className="karma-wrapper">
        <p className="karma-score">Karma Score: {plate.karma}</p>
      </div>
      <ul className='reviews'>
        {/* <Review reviews={reviews} /> */}
        {review}
      </ul>
    </div>

  );
};

export default Plate;
