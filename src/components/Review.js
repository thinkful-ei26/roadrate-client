import React, { useState } from 'react';
import Spinner from 'react-spinkit';
import '../styles/reviews.css'
import { Redirect } from 'react-router-dom';


import { Icon } from 'react-materialize';

export const Review = (props) => {

    // const imgSrc = '/';
    //if an image is uploaded by a user then it will be included in the review, otherwise no image will be displayed
    // if(review.img) {
    //   imgSrc = review.img;
    // }

    const [ redirect, setRedirect ] = useState(false)

    const { searchReviews, searchInput } = props;
    const reviews = props.reviews;
    // console.log('props on Review component: ', props);

    //Setting the time up for todays date
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    
    if (mm < 10) {
      mm = '0' + mm;
    }

    today = `${mm}/${dd}/${yyyy}`

    let review = (
      <div className="spinner" style={{}}>
        <Spinner name="line-spin-fade-loader" color="green"/>
      </div>
    )

    let rating;
   
    if (reviews) {
      console.log(reviews);
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

        if(redirect) {

          return <Redirect to='/plate'/>
        }

        const handleClick = () => {
          localStorage.setItem('currentPlateState', review.plateState)
          localStorage.setItem('currentPlateNumber', review.plateNumber)
          setRedirect(true)
        }
    
        return (
          <li className='review-item' key={review._id} tabIndex='0'>
            <article className='review-header'>
              <article className='review-title'>
                <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
                <button onClick={()=>handleClick()}> 
                  {review.plateNumber} {review.plateState}
                </button>
               
                
                <p id='review-time'>{today}</p>
              </article>
              <article className='review-rating'>
                <p className='rating'>{rating}</p>
              </article>
            </article>
            {/* <h1 className='plate-number'>{review.plateNumber}</h1><br/> */}
            {/* <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img> */}
            
            {/* Do we want to add information about how long ago this was posted, i.e. 2m or 2h */}
            
            <p className='message'>Review: {review.message}</p>
            {driverComment}
          </li>
        )
      });
    };

    return(
      review
    )
}

export default Review;