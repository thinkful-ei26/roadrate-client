import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import InfiniteScroll from 'react-infinite-scroller';
import Review from './Review';
import '../styles/review-list.css';

export const ReviewList = (props) => {

   //storing Review Data in State

  //I need to be able to get an array of reviews and set it to the reviews variable below.  I then need to pass reviews as a prop from dashboard to ReviewList so I can map through the data and send those details as props to Review in order to render multiple Reviews at once on the dashboard.
  const [reviews, setReviews] = useState([]);
  // const [searchInput, setSearchInput] = useState("");
  const [ searchPlateState, setSearchPlateState ] = useState("");
  const [ searchPlateNumber, setSearchPlateNumber] = useState("");
  const [ start, setStart ] = useState(0);
  const [ count, setCount ] = useState(15);

    const fetchReviews = async () => {
      let url = `${API_BASE_URL}/reviews/?start=${start}&count=${count}`;
      const response = await fetch(url);
      const reviews  = await response.json();
      // console.log(reviews)
      setReviews(reviews)
      return reviews
    }

    const fetchMoreReviews = e => {
      // e.preventDefault();
      console.log('fetch MORE REVIEWS HAS FIRED!!!!!!!!!!!');
      setStart(start + count);
      return fetch(`${API_BASE_URL}/reviews/?start=${start}&count=${count}`)
      .then(res => { 
        if (!res.ok) {
          return Promise.reject(res.statusText);
        }
        let newReviews = res.json();
        console.log('new-reviews', newReviews)
        return newReviews;
      })
      .then(newReviews => {
        console.log('DATA FROM SEARCH-REVIEWS:' ,newReviews)
        setReviews(reviews.concat(newReviews))
      })
      .catch(err => console.log(err))
  }
    
    useEffect(() => {
      fetchReviews();
    }, []);

    const handleSubmit = e => {
      e.preventDefault(); 
      console.log('sending', searchPlateNumber)
      console.log('sending:', searchPlateState);
      // console.log('search', searchInput)
      return fetch(`${API_BASE_URL}/reviews/?number=${searchPlateNumber}&state=${searchPlateState}`)
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

    return (
      <div className="review-list">
        <div className="search-section">
        <fieldset id="review-search">
          <legend>Search By License Plate: </legend>
          <form 
            id="search-form"
            className="search-form"
            onKeyUp={(e) => handleSubmit(e)}
            onClick={(e) => handleSubmit(e)}
          >
            {/* <div className="search-review-wrapper"> */}
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
            {/* </div> */}
          </form>
        </fieldset>
        </div>
        <ul className='review-list' >
          <InfiniteScroll 
            pageStart={0}
            loadMore={fetchMoreReviews}
            dataLength={reviews.length}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
              <Review 
                reviews={reviews} 
              />
          </InfiniteScroll>
        </ul>
      </div>
    );
}

export default ReviewList;