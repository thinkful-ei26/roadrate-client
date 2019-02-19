import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Review from './Review';

import '../styles/review-list.css';

export const ReviewList = (props) => {

   //storing Review Data in State

  //I need to be able to get an array of reviews and set it to the reviews variable below.  I then need to pass reviews as a prop from dashboard to ReviewList so I can map through the data and send those details as props to Review in order to render multiple Reviews at once on the dashboard.
  const [reviews, setReviews] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const [searchReviews, setSearchReviews] = useState([]);

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews`;
      const response = await fetch(url);
      const reviews  = await response.json();
      console.log(reviews)
      setReviews(reviews)
      return reviews
    }
    
    useEffect(() => {
      fetchReviews();
    }, []);

    const handleSubmit = e => {
      e.preventDefault(); 
  
      console.log('search', searchInput)
      return fetch(`${API_BASE_URL}/reviews/?search=${searchInput}`)
        .then(res => { 
          if (!res.ok) {
            return Promise.reject(res.statusText);
          }
          const searchReviews = res.json();
          console.log('search-reviews', searchReviews)
          return searchReviews;
        })
        .then(data => {
          console.log('DATA FROM SEARCH-REVIEWS:' ,data)
          setReviews(data)
          // setSearchReviews(data)
        })
        .catch(err => console.log(err))
    }

    // console.log(searchReviews)

    return (
      <div className="review-list-div">
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

        <ul className='review-list'>
          <Review 
            reviews={reviews} 
          />
        </ul>
      </div>
    );
}

export default ReviewList;