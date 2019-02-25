import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';
import Review from './Review'
import '../styles/my-reviews.css';

export const MyReviews = (props) => {
  const [ reviews, setReviews] = useState("");
  const [ searchInput, setSearchInput ] = useState("");
  // const [ filteredReviews, setFilteredReviews ] = useState("");

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews/${localStorage.user}`;
      const response = await fetch(url);
      const reviews  = await response.json();
      console.log(reviews)
      setReviews(reviews)
      return reviews
    }

    useEffect(() => {
      fetchReviews();
    }, []);

    const handleSubmit = () => {
      console.log(searchInput)
    }

    let rating;
    let review;
    let driverComment;
    let filteredReviews;
    if (reviews) {
      filteredReviews = reviews.filter(review => review.plateNumber.includes(searchInput.toUpperCase()));
      // review = filteredReviews.map((review, index) => { 
      //   if (review.isPostive === 'true') {
      //     rating = <Icon>thumb_up</Icon>
      //   } else {
      //     rating = <Icon>thumb_down</Icon>
      //   }

      //   if (review.comment) {
      //     driverComment = <p> Driver Response: {review.comment}</p>
      //   } 

      //   return (
      //     <li className='review-item' key={review._id} tabIndex='0'>
      //       <article className='review-header'>
      //         <article className='review-title'>
      //           <img className='isClaimed-icon' src='https://cdn4.iconfinder.com/data/icons/flatastic-11-1/256/user-green-512.png' alt='green user icon'></img>
      //             {review.plateNumber} {review.plateState}         
      //           {/* <p id='review-time'>{today}</p> */}
      //         </article>
      //         <article className='review-rating'>
      //           <p className='rating'>{rating}</p>
      //         </article>
      //       </article>
      //       {/* <h1 className='plate-number'>{review.plateNumber}</h1><br/> */}
      //       {/* <img className='review-img' src='https://i.pinimg.com/236x/29/55/38/295538a452d701c9189d0fa8f5b36938--white-truck-bad-parking.jpg' alt='review'></img> */}          
      //       {/* Do we want to add information about how long ago this was posted, i.e. 2m or 2h */}          
      //       <p className='message'>Review: {review.message}</p>
      //       <p>{driverComment}</p>
      //     </li>
      //   )
      // })
    };

  return (
    <div className="my-reviews">
      <Link to="/" className="my-reviews-back-link">
          <button>Go Back</button>
      </Link>
      <section className='my-reviews-content'>
        <h2>My Reviews</h2>
        <div className="search-section">
          <fieldset id="review-search">
            <legend>Search By License Plate: </legend>
            <form 
              id="search-form"
              className="search-form"
              onKeyUp={handleSubmit}
            >
              <div className="input-wrapper">
                <label 
                  htmlFor="search"
                  className="search-label"
                  aria-label="search-form"
                >
                <input
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  type="search"
                  id="search"
                  name="search"
                  className="search-input"
                  placeholder="2073WE..."
                />
                </label>
              </div>
            </form>
          </fieldset>
          </div>
        <ul className='reviews'>
          <Review reviews={filteredReviews}/>
        </ul>
      </section>
    </div>

  );
};

export default MyReviews;
