import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export const CreatePlateForm = (props) => {
  const [ ownerResponse, setOwnerResponse ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ anything, setAnything ] = useState('');

  // const [ plateState, setPlateState ] = useState('');

  

  const { reviewId } = props;
 
  const handleSubmit = (e) => {
      e.preventDefault();

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
          setSuccessMessage(true)
          localStorage.removeItem('submitResponse');
          return data
        })
        .catch(err => console.log(err))
      }

      let formBody;
      if (successMessage) {
        formBody = <p>Thanks. Your response was saved.</p>
        // return <Redirect to='/my-plate' />
      } else {
        formBody = (<fieldset>
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
          </form>
            <button id="cancel-owner-response-from" onClick={() => {
              console.log(successMessage)
              localStorage.setItem('submitResponse', false);
              setAnything('something');
            }
              }> 
              Cancel
            </button>
        </fieldset>)
      }


  return (
      <div className="submit-response">
        {formBody}
      </div>  
  )
}

export default CreatePlateForm;