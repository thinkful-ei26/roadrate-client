import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Spinner from 'react-spinkit';
import { Icon } from 'react-materialize';
import {/*  Redirect, */ Link } from 'react-router-dom';
// import Review from './Review';
import '../styles/review-list.css';
import '../styles/reviews.css'

export const ReviewList = () => {
  const [ reviews, setReviews] = useState("");
  // const [ redirect, setRedirect ] = useState(false)
  // const [searchInput, setSearchInput] = useState("");
  const [ searchPlateState, setSearchPlateState ] = useState("");
  const [ searchPlateNumber, setSearchPlateNumber] = useState("");

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

    const handleSubmit = e => {
      e.preventDefault(); 

      console.log('sending', searchPlateNumber)
      console.log('sending:', searchPlateState);
      // console.log('search', searchInput)
      return fetch(`${API_BASE_URL}/reviews/?number=${searchPlateNumber}`)
        .then(res => { 
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          const searchReviews = res.json();
          // console.log('search-reviews', searchReviews)
          return searchReviews;
        })
        .then(data => {
          // console.log('DATA FROM SEARCH-REVIEWS:' ,data)
          setReviews(data)
        })
        .catch(err => console.log(err))
    }

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

        // let redirectLink = `/plate`;
        // if(redirect) {
        //   return <Redirect to={redirectLink} />
        // }

        const handleClick = () => {
          localStorage.setItem('currentPlateState', review.plateState)
          localStorage.setItem('currentPlateNumber', review.plateNumber)
          // setRedirect(true)
        }

        // let redirectLink = `/plate/id/${localStorage.myPlateId}`;
        // if(redirect) {
        //   return <Redirect to={redirectLink} />
        // }

        // const plateClick = (plate) => {
        //   console.log('plate inside li',plate)
        //   localStorage.setItem('currentPlate', plate.plateNumber)
        //   localStorage.setItem('currentState', plate.plateState)
        //   localStorage.setItem('currentPlateId', plate.id)
        //   setRedirect(true)
        //   return plate
        // }

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

              {/* ---- ROUTE TO A SHARABLE PUBLIC PLATE LINK ---- */}
              <Link to={`/plate/id/${review.plateId}`}>
                <button
                  onClick={() => {
                    // localStorage.setItem('currentPlateId', review.plateId)
                    handleClick()
                  }}
                > 
                  {review.plateNumber} {review.plateState}
                </button>    
              </Link> 

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
      <div className="review-list">
        <div className="search-section">
        <fieldset id="review-search">
          <legend>Search By License Plate: </legend>
          <form 
            id="search-form"
            className="search-form"
            onKeyUp={e => handleSubmit(e)}
            // onClick={(e) => handleSubmit(e)}
          >
            <label 
              htmlFor="search"
              className="search-label"
              aria-label="search-form"
            >
            <input
              value={searchPlateNumber}
              onChange={e => setSearchPlateNumber(e.target.value)}
              type="search"
              id="search"
              name="search"
              className="search-input"
              placeholder="2073WE..."
            />
            </label>

            <select id="search-state" className='browser-default' value={searchPlateState} onChange={(e) => setSearchPlateState(e.target.value)}>
              <option value=''>State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
          </form>
        </fieldset>
        </div>
        <ul>
          {review}
        </ul>
      </div>
      
    )
}

export default ReviewList;

/* ======= REVIEW LIST via PROPS (old) ======== */

// import React, { useState, useEffect } from 'react';
// import { API_BASE_URL } from '../config';
// import Review from './Review';
// import '../styles/review-list.css';

// export const ReviewList = (props) => {

//    //storing Review Data in State

//   //I need to be able to get an array of reviews and set it to the reviews variable below.  I then need to pass reviews as a prop from dashboard to ReviewList so I can map through the data and send those details as props to Review in order to render multiple Reviews at once on the dashboard.
//   const [reviews, setReviews] = useState("");
//   // const [searchInput, setSearchInput] = useState("");
//   const [ searchPlateState, setSearchPlateState ] = useState("");
//   const [ searchPlateNumber, setSearchPlateNumber] = useState("");

//     const fetchReviews = async () => {
//       let url = `${API_BASE_URL}/reviews`;
//       const response = await fetch(url);
//       const reviews  = await response.json();
//       // console.log(reviews)
//       setReviews(reviews)
//       return reviews
//     }
    
//     useEffect(() => {
//       fetchReviews();
//     }, []);

//     const handleSubmit = e => {
//       e.preventDefault(); 


//       console.log('sending', searchPlateNumber)
//       console.log('sending:', searchPlateState);
//       // console.log('search', searchInput)
//       return fetch(`${API_BASE_URL}/reviews/?number=${searchPlateNumber}&state=${searchPlateState}`)
//         .then(res => { 
//           if (!res.ok) {
//             return Promise.reject(res.statusText);
//           }
//           const searchReviews = res.json();
//           // console.log('search-reviews', searchReviews)
//           return searchReviews;
//         })
//         .then(data => {
//           // console.log('DATA FROM SEARCH-REVIEWS:' ,data)
//           setReviews(data)
//         })
//         .catch(err => console.log(err))
//     }

//     return (
//       <div className="review-list">
//         <div className="search-section">
//         <fieldset id="review-search">
//           <legend>Search By License Plate: </legend>
//           <form 
//             id="search-form"
//             className="search-form"
//             onKeyUp={(e) => handleSubmit(e)}
//             onClick={(e) => handleSubmit(e)}
//           >
//             <label 
//               htmlFor="search"
//               className="search-label"
//               aria-label="search-form"
//             >
//             <input
//               value={searchPlateNumber}
//               onChange={e => setSearchPlateNumber(e.target.value)}
//               type="search"
//               id="search"
//               name="search"
//               className="search-input"
//               placeholder="2073WE..."
//             />
//             </label>

//             <select id="search-state" className='browser-default' value={searchPlateState} onChange={(e) => setSearchPlateState(e.target.value)}>
//               <option value=''>State</option>
//               <option value="AL">Alabama</option>
//               <option value="AK">Alaska</option>
//               <option value="AZ">Arizona</option>
//               <option value="AR">Arkansas</option>
//               <option value="CA">California</option>
//               <option value="CO">Colorado</option>
//               <option value="CT">Connecticut</option>
//               <option value="DE">Delaware</option>
//               <option value="DC">District Of Columbia</option>
//               <option value="FL">Florida</option>
//               <option value="GA">Georgia</option>
//               <option value="HI">Hawaii</option>
//               <option value="ID">Idaho</option>
//               <option value="IL">Illinois</option>
//               <option value="IN">Indiana</option>
//               <option value="IA">Iowa</option>
//               <option value="KS">Kansas</option>
//               <option value="KY">Kentucky</option>
//               <option value="LA">Louisiana</option>
//               <option value="ME">Maine</option>
//               <option value="MD">Maryland</option>
//               <option value="MA">Massachusetts</option>
//               <option value="MI">Michigan</option>
//               <option value="MN">Minnesota</option>
//               <option value="MS">Mississippi</option>
//               <option value="MO">Missouri</option>
//               <option value="MT">Montana</option>
//               <option value="NE">Nebraska</option>
//               <option value="NV">Nevada</option>
//               <option value="NH">New Hampshire</option>
//               <option value="NJ">New Jersey</option>
//               <option value="NM">New Mexico</option>
//               <option value="NY">New York</option>
//               <option value="NC">North Carolina</option>
//               <option value="ND">North Dakota</option>
//               <option value="OH">Ohio</option>
//               <option value="OK">Oklahoma</option>
//               <option value="OR">Oregon</option>
//               <option value="PA">Pennsylvania</option>
//               <option value="RI">Rhode Island</option>
//               <option value="SC">South Carolina</option>
//               <option value="SD">South Dakota</option>
//               <option value="TN">Tennessee</option>
//               <option value="TX">Texas</option>
//               <option value="UT">Utah</option>
//               <option value="VT">Vermont</option>
//               <option value="VA">Virginia</option>
//               <option value="WA">Washington</option>
//               <option value="WV">West Virginia</option>
//               <option value="WI">Wisconsin</option>
//               <option value="WY">Wyoming</option>
//             </select>
//           </form>
//         </fieldset>
//         </div>
//         <ul className='review-list'>
//           <Review 
//             reviews={reviews} 
//           />
//         </ul>
//       </div>
//     );
// }

// export default ReviewList;