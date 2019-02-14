import React, {useState, useEffect} from 'react';
import {API_BASE_URL} from '../config'

export const ReviewForm = () => {
  const [ plateId, setPlateId ] = useState('');
  const [ rating, setRating ] = useState('');
  const [ message, setMessage ] = useState('');

  console.log('user in review form', localStorage.user);
  
  const handleSubmit = e => {
    e.preventDefault(); 
    if (!plateId) return;
    if (!rating) return;
    if (!message) return;
   
    console.log(`plateId: ${plateId}, rating: ${rating}, message: ${message}`)

    setPlateId(plateId)
    setRating(rating)    
    setMessage(message)
    const user = localStorage.user

    console.log('auth token', localStorage.authToken);
    return fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        plateId,
        rating,
        message,
        user
      })
    })
    .then(res => {
      console.log('res', res)
      return res.json();
      })
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
          value={plateId}
          onChange={(e) => setPlateId(e.target.value)}
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
        <button 
        type="submit" 
        className="review-submit"
      >
        Submit Review
      </button>
      </form>
    </div>
  )
}

export default ReviewForm;