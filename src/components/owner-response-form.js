import React, { useState } from 'react';
import { API_BASE_URL } from '../config';

export const CreatePlateForm = (props) => {
  const [ ownerResponse, setOwnerResponse ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ hideForm, setHideForm ] = useState(false);

  // const [ plateState, setPlateState ] = useState('');

  let formBody;

  if (hideForm) {
    formBody = ''
  }

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
          props.fetchReviews()
          return data
        })
        .catch(err => console.log(err))
      }

      
      if (successMessage) {
        formBody = <p>Thanks. Your response was saved.</p>
        // return <Redirect to='/my-plate' />
      } else {
        formBody = (<fieldset id='owner-submit-form'>
        <legend>Leave a Response</legend>
          <form 
            id="owner-response-form"
            onSubmit={handleSubmit}
          >
            <label 
              htmlFor="submit-response"
              className="owner-response-label"
              aria-label="owner-response-form"
            >
              <textarea
                value={ownerResponse}
                onChange={e => setOwnerResponse(e.target.value)}
                type="textbox"
                id="owner-response"
                name="owner-response"
                placeholder="Your response"
              />
            </label>
    
            <button id="submit-owner-response-btn">
              Submit
            </button>
          </form>
            {/* <button id="cancel-owner-response-from" onClick={() => {
              console.log('hi')
              localStorage.setItem('submitResponse', false);
              hideTheForm();
            }
              }> 
              Cancel
            </button> */}
        </fieldset>)
      }


  return (
      <div className="submit-response">
        {formBody}
      </div>  
  )
}

export default CreatePlateForm;