import React, { useState, useEffect } from 'react';
import {API_BASE_URL} from '../config';
import Spinner from 'react-spinkit';
import '../styles/reviews.css'
import { Redirect } from 'react-router-dom';
import { Icon } from 'react-materialize';

export const Review = () => {
  const [ reviews, setReviews] = useState("");
  const [ redirect, setRedirect ] = useState(false)

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews`;
      const response = await fetch(url);
      const reviews  = await response.json();
      setReviews(reviews)
      return reviews
    }

    useEffect(() => {
      fetchReviews()
    }, []);

    let review = (
      <div className="spinner" style={{}}>
        <Spinner name="line-spin-fade-loader" color="green"/>
      </div>
    )

    let rating;
    if (reviews) {
       review = reviews.map((review, index) => { 
        let driverComment;
        if (review.isPositive === 'true') {
          rating = <Icon>thumb_up</Icon>
        } else {
          rating = <Icon>thumb_down</Icon>
        }

        if (review.ownerResponse) {
          driverComment = <p> Driver Response: {review.ownerResponse}</p>
        } 

        let redirectLink = `/plate`;
        if(redirect) {
          return <Redirect to={redirectLink} />
        }

        const handleClick = () => {
          localStorage.setItem('currentPlateState', review.plateState)
          localStorage.setItem('currentPlateNumber', review.plateNumber)
          setRedirect(true)
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
          <li className='review-item' key={review._id} index-key={index} tabIndex='0'>
            <article className='review-header'>
              <article className='review-title'>
                <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
                <button onClick={()=>handleClick()}> 
                  {review.plateNumber} {review.plateState}
                </button>     
                <p id="elapsed-time">{elapsedTime}</p>
              </article>
              <article className='review-rating'>
                <p className='rating'>{rating}</p>
              </article>
            </article>       
            <p className='message'>Review: {review.message}</p>
            {driverComment}
            <p id='review-date'>{dateString}</p>
          </li>
        )
      });
    };

    return(
      review
    )
}

export default Review;




/* ======= REVIEWS via PROPS (old) ======== */

// import React, { useState } from 'react';
// import Spinner from 'react-spinkit';
// import '../styles/reviews.css'
// import { Redirect } from 'react-router-dom';
// import { Icon } from 'react-materialize';

// export const Review = (props) => {
//     const reviews = props.reviews;
//     const [ redirect, setRedirect ] = useState(false)

//     let review = (
//       <div className="spinner" style={{}}>
//         <Spinner name="line-spin-fade-loader" color="green"/>
//       </div>
//     )

//     let rating;
//     if (reviews) {
//       console.log('review list: ',reviews);
//        review = reviews.map((review, index) => { 
//         let driverComment;
//         if (review.isPositive === 'true') {
//           rating = <Icon>thumb_up</Icon>
//         } else {
//           rating = <Icon>thumb_down</Icon>
//         }

//         if (review.ownerResponse) {
//           driverComment = <p> Driver Response: {review.ownerResponse}</p>
//         } 

//         // console.log(review.plateId)
//         let redirectLink = `/plate`;
//         if(redirect) {
//           return <Redirect to={redirectLink} />
//         }

//         const handleClick = () => {
//           localStorage.setItem('currentPlateState', review.plateState)
//           localStorage.setItem('currentPlateNumber', review.plateNumber)
//           setRedirect(true)
//         }

//         const thisDate = new Date();
        
//         const date = new Date(review.createdAt)
//         const year = date.getFullYear();
//         let month = (date.getMonth() + 1).toString();
//         const day = date.getDate();
//         let minutes = date.getMinutes();
//         let hour = date.getHours();

//         //add 0 for times less than 10
//         if (minutes < 10) {
//           minutes = '0' + minutes
//         }

//         let hourTime;
//         hour > 12 ? hourTime = `${hour - 12}:${minutes} PM ` : hourTime = `${hour}:${minutes} AM `
        
//         //convert month number to month word
//         switch (month) {
//           case '1':
//             month = 'Jan'
//             break;
//           case '2':
//             month = 'Feb'
//             break;
//           case '3':
//             month = 'Mar'
//             break;
//           case '4':
//             month = 'Apr'
//             break;
//           case '5':
//             month = 'May'
//             break;
//           case '6':
//             month = 'Jun'
//             break;
//           case '7':
//             month = 'Jul'
//             break;
//           case '8':
//             month = 'Aug'
//             break;
//           case '9':
//             month = 'Sep'
//             break;
//           case '10':
//             month = 'Oct'
//             break;
//           case '11':
//             month = 'Nov'
//             break;
//           case '12':
//             month = 'Dec'
//             break;
//           default:
//             month = null
//           }
        
//         let yearTime = ` - ${day} ${month} ${year}`
//         const dateString = hourTime + yearTime;

//         const timePassed = thisDate - date;

//         let elapsedTime;
//         const convert = (ms) => {
//           let d, h, m, s;
//           s = Math.floor(ms / 1000);
//           m = Math.floor(s / 60);
//           s = s % 60;
//           h = Math.floor(m / 60);
//           m = m % 60;
//           d = Math.floor(h / 24);
//           h = h % 24;

//           if (d < 1 && h < 1) {
//             elapsedTime = `${m}m ago`
//           } else if (d < 1 && h < 2) {
//             elapsedTime = `${h}hr ago`
//           } else if (d < 1 && h > 2) {
//             elapsedTime = `${h}hrs ago`
//             //this will need to be updated for short months
//           } else if (d === 1) {
//             elapsedTime = `${d} day ago`
//           } else if (d > 1 && d < 31) {
//             elapsedTime = `${d} days ago`
//           } else if (d > 31 && d < 62) {
//             elapsedTime = `1 month ago`
//           }
//         };

//         if (timePassed) {
//           convert(timePassed)
//         }

//         return (
//           <li className='review-item' key={review._id} index-key={index} tabIndex='0'>
//             <article className='review-header'>
//               <article className='review-title'>
//                 <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
//                 <button onClick={()=>handleClick()}> 
//                   {review.plateNumber} {review.plateState}
//                 </button>     
//                 <p id="elapsed-time">{elapsedTime}</p>
//               </article>
//               <article className='review-rating'>
//                 <p className='rating'>{rating}</p>
//               </article>
//             </article>
//             {/* <h1 className='plate-number'>{review.plateNumber}</h1><br/> */}
//             {/* <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img> */}           
//             <p className='message'>Review: {review.message}</p>
//             {driverComment}
//             <p id='review-date'>{dateString}</p>
//           </li>
//         )
//       });
//     };

//     return(
//       review
//     )
// }

// export default Review;