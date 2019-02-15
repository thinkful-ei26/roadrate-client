import React, {useState, useEffect} from 'react';
import {API_BASE_URL} from '../config';
import { Button, Icon } from 'react-materialize';

export const ReviewForm = () => {
  const [ licensePlate, setLicensePlate ] = useState('');
  const [ rating, setRating ] = useState('');
  const [ message, setMessage ] = useState('');

  console.log('user in review form', localStorage.user);
  
  const handleSubmit = e => {
    e.preventDefault(); 
    // if (!setLicensePlate) return;
    // if (!rating) return;
    // if (!message) return;

    console.log('button-clicked')
   
    console.log(`plateId: ${licensePlate}, rating: ${rating}, message: ${message}, userId: ${localStorage.userId}`)

    setLicensePlate(licensePlate)
    setRating(rating)    
    setMessage(message)
    const username = localStorage.user
    const reviewerId = localStorage.userId

    return fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        licensePlate,
        rating,
        message,
        username,
        reviewerId,
      })
    })
    .then(res => {

      return res.json();
      })
      .then(data => console.log(data))
      // .then(data => {  
      // return data.name && data.username && data.password;
      // })
      .catch(err => console.log(err))
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='plateId'>License Plate: </label>
        <input
          type='text' 
          name='plateId' 
          placeholder='X90PL'
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
        />
        <label htmlFor='rating'>Rating: </label> 
        <br></br>
          <label htmlFor='good'>Good</label>
          <input 
            type='checkbox' 
            name='rating' 
            value='true'
            onChange={(e) => setRating(e.target.value)}
          />
          <label htmlFor='good'>Bad</label>
          <input 
            type='checkbox' 
            name='rating' 
            value='false'
            onChange={(e) => setRating(e.target.value)}
          />
        <label htmlFor='message'>Message: </label>
        <input 
          type='text' 
          name='message' 
          placeholder='Type your message here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
        type="submit" 
        className="review-submit"
      >
        Submit Review
      </Button>
      </form>
    </div>
  )
}

export default ReviewForm;