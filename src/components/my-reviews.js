import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import '../styles/my-reviews.css';

export const MyReviews = () => {
  const [ reviews, setReviews] = useState("");
  const [ searchInput, setSearchInput ] = useState("");

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews/${localStorage.userId}`;
      const response = await fetch(url);
      const reviews  = await response.json();
      // console.log(reviews)
      setReviews(reviews)
      return reviews
    }

    useEffect(() => {
      fetchReviews();
    }, [reviews]);

    const handleSubmit = () => {
      console.log(searchInput)
    }

    let rating;
    let review;
    let driverComment;
    let filteredReviews;
    if (reviews) {
      filteredReviews = reviews.filter(review => review.plateNumber.includes(searchInput.toUpperCase()));
      review = filteredReviews.map((review, index) => { 
        if (review.isPostive === 'true') {
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
              </article>
              <article className='review-rating'>
                <p className='rating'>{rating}</p>
              </article>
            </article>       
            <p className='message'>Review: {review.message}</p>
            <p>{driverComment}</p>
          </li>
        )
      })
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
          {review}
        </ul>

      </section>
    </div>

  );
};

export default MyReviews;
