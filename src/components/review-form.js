import React, {useState, useEffect} from 'react';
import {API_BASE_URL} from '../config';
import { Button, Icon } from 'react-materialize';

export const ReviewForm = () => {
  const [ plateNumber, setPlateNumber ] = useState('');
  const [ rating, setRating ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ plateState, setPlateState ] = useState('');
  const [ submitted, setSubmitted ] = useState(false)
  
  const handleSubmit = e => {
    // console.log(`plateNumber: ${plateNumber}, rating: ${rating}, message: ${message}, reviewerId: ${localStorage.userId}`)
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
        plateNumber: plateNumber.toUpperCase(),
        rating,
        message,
        username,
        reviewerId,
        plateState,
      })
    })
    .then(() => setSubmitted(true))
    .then(() => {
      setPlateNumber('');
      setMessage('');
      setPlateState('');
      setRating('');
    })
    .catch(err => console.log((err)))
  };

  let successMessage;
  if (submitted) {
    successMessage = <p>Thanks! Your review was submitted.</p>
  }

  return (
    <div className='submit-review'>
      <h4>Submit Review:</h4>
      <form id='submit-review-form' onSubmit={handleSubmit}>
        <label htmlFor='plateId'>License Plate:
        <input
          type='text' 
          name='plateId' 
          placeholder='X90PL'
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          title="must contain a license plate number"
          required
        />
        </label>

        <label htmlFor='rating'>Rating: 
        <select className='browser-default' value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value=''>Select Rating</option>
          <option value="true">Good</option>
          <option value="false">Bad</option>
        </select>
        </label>

        <label htmlFor='plateState'>State: 
        <select className='browser-default' value={plateState} onChange={(e) => setPlateState(e.target.value)}>
          <option value=''>Select State</option>
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
        </label>

        <label htmlFor='message' >Message: 
        <input 
          id='review-message-input'
          type='text' 
          name='message' 
          placeholder='Type your message here...'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        </label>
        
        <Button
        type="submit" 
        className="review-submit"
        disabled={plateNumber === '' || plateState === '' || !rating || message === '' }
        >
        Submit Review
      </Button>
      </form>
      {successMessage}  
    </div>
  )
}

export default ReviewForm;