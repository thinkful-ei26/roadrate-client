import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export const CreatePlateForm = (props) => {
  const [ ownerResponse, setOwnerResponse ] = useState('');
  // const [ plateState, setPlateState ] = useState('');

  const { reviewId } = props;
 
  const handleSubmit = (e) => {
      e.preventDefault();
      const userId = localStorage.userId;

      return fetch(`${API_BASE_URL}/reviews/${reviewId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.authToken}`
          },
          body: JSON.stringify({
            ownerResponse: ownerResponse
          })
        })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log('DATA REGISTER PLATE:', data)
          return data
        })
        .catch(err => console.log(err))
      }


  return (
      <div className="submit-response">
       <fieldset>
        <legend>License Plate Number</legend>
        <form 
          id="owner-response-form"
          onSubmit={handleSubmit}
        >
          <label 
            htmlFor="submit-response"
            className="owner-response-label"
            aria-label="owner-response-form"
          >
            <input
              value={ownerResponse}
              onChange={e => setOwnerResponse(e.target.value)}
              type="text"
              id="owner-response"
              name="owner-response"
              placeholder="Your response"
            />
          </label>
  
          <button id="submit-owner-response">
              Submit
          </button>
          <Link to="/" className="plates-back-link">
              <button>Go Back</button>
          </Link>
        </form>
      </fieldset>
        
      </div>  
  )
}

export default CreatePlateForm;