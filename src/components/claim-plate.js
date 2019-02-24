import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import '../styles/claim-plate.css';

export const claimPlate = () => {
  const [ plateNumber, setPlateNumber ] = useState('');
  const [ plateState, setPlateState ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ plates, setPlates ] = useState('before search');

  /* ========= SEARCH LICENSE PLATE TO CLAIM ========== */
  const handleSubmit = e => {
    e.preventDefault(e); 

    return fetch(`${API_BASE_URL}/plates/?state=${plateState}&search=${plateNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      }
    })
    .then(res => {
      console.log('response: >>>', res)
      return res.json();
      })
    .then(data => {
      if(data === undefined){
        console.log('undefined')
      }
      // console.log('data on searchPlate',data);
      setPlates(data[0])
    })
    .catch(err => {
      console.log(err)
      console.log('There is no match for that ID');
      setPlates('');
      if(err === 'TypeError: Failed to fetch'){
        return Promise.reject(err)
      }
      console.log(err)
      }
    )
  };

 /* ========= POST A NEW PLATE ========== */
  const handleRegisterPlate = (e) => {
    e.preventDefault();
    const userId = localStorage.userId;

    localStorage.setItem('myPlate', plateNumber.toUpperCase())
    localStorage.setItem('myState', plateState)

    return fetch(`${API_BASE_URL}/plates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        plateNumber: plateNumber.toUpperCase(),
        plateState,
        userId,
      })
    })
    .then(res => {
      // console.log('res inside handleSubmit', res);
      return res.json();
    })
    .then(data => {
      // console.log('DATA REGISTER PLATE:', data)
      setSuccessMessage(`Congrats! Your plate ${localStorage.myPlate} - ${localStorage.myState} was registered.`)
      return data
    })
    .catch(err => console.log(err))
  }

  /* ========= UPDATE AN EXISTING PLATE ========== */
  // PUT to link an existing plate to the current user
  const handleClaimClick = e => {
    e.preventDefault();
    const userId = localStorage.userId;

    localStorage.setItem('myPlate', plateNumber)
    localStorage.setItem('myState', plateState)

    return fetch(`${API_BASE_URL}/plates/${localStorage.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      },
      body: JSON.stringify({
        userId,
        plateNumber: plateNumber.toUpperCase(),
        plateState
      })
    })
    .then(res => {
      // console.log('res inside handleLink >>>', res);
      setSuccessMessage(`Congrats! Your plate ${localStorage.myPlate} - ${localStorage.myState} was registered.`)
      return res.json();
    })
    .catch(err => console.log(err))
  }

  // console.log('plate result from GET', plates)
  /* ========= DYNAMIC SEARCH RESULT TABLE ========== */
  let plateTable;

  if (plates && plates !== 'before search' && !plates.userId ) {
  plateTable = (
    <table>
      <tr>
        <th>License Plate</th>
        <th>State</th>
        <th>Karma Score</th> 
        <th>Ratings</th>
        <th>Add to Your Account</th>
        <th>Register Your Plate</th>
        </tr>
        <tr>
          <td>{plates.plateNumber}</td>
          <td>{plates.plateState}</td>
          <td>{plates.karma}</td>
          {/* need to get reviews.length of all of the reviews that have ever mentioned this license plate */}
          <td>0</td>
          <td>
            <button 
              className='add-to-user-button' 
              onClick={(e) => {handleClaimClick(e)}}
              disabled={successMessage}
            >
              Claim
            </button>
          </td>
        </tr>
      </table>
    )
  } else if (plateNumber === '') {
    plateTable = (
      <table>
      <tr>
        <th>License Plate</th>
        <th>State</th>
        <th>Karma Score</th> 
        <th>Ratings</th>
        <th>Register Your Plate</th>
      </tr>
      <p>Please Search for a Valid Plate</p>
    </table>
    )
  } else if (plates === [] || plates === undefined) {
    // if the plateNumber is not in DB, then allow user to create a new plate & register it as theirs
    plateTable = (
      <table>
        <tr>
          <th>License Plate</th>
          <th>State</th>
          <th>Karma Score</th> 
          <th>Ratings</th>
          <th>Register Your Plate</th>
        </tr>
        <tr>
          <td>{plateNumber}</td>
          <td>{plateState}</td>
          <td>No Karma Score Yet!</td>
          {/* need to get reviews.length of all of the reviews that have ever mentioned this license plate */}
          <td>No Reviews Yet!</td>
          <td>
          <button 
            className='register-plate' 
            onClick={(e) => handleRegisterPlate(e)}
            disabled={successMessage}
          >
            Register Plate
          </button>
          </td>
        </tr>
      </table>
    )
  } else if (plates.userId) {
    //if a plate has already been registered
    plateTable = (
    <div className="plateTable">
      <table>
        <tr>
          <th>License Plate</th>
          <th>State</th>
          <th>Karma Score</th> 
          <th>Ratings</th>
          <th>Add to Your Account</th>
          <th>Register Your Plate</th>
          </tr>
          <tr>
            <td>{plates.plateNumber}</td>
            <td>{plates.plateState}</td>
            <td>{plates.karma}</td>
            {/* need to get reviews.length of all of the reviews that have ever mentioned this license plate */}
            <td>0</td>
            <td>
              ALREADY CLAIMED
            </td>
          </tr>
        </table>

        <p>
          Need to <strong>Unlink</strong> your plate? Go to:
        </p>
        <Link to="/my-plates">
          <span className="my-plates-link">My Plates</span>
        </Link>

      </div>
    )
  } else {
    plateTable = (<p>Submit a search</p>)
  }

  /* ========= RENDER CLAIM PLATE PAGE ========== */
  return (
    <div className="claimPlate">
    <Link to="/" className="claim-back-link">
      Go Back
    </Link>
    <h2>Claim A Plate</h2>

    <div className="claim-search">
     <fieldset id="claim-plate-search">
      <legend>License Plate Number</legend>
        <form 
          id="claim-search-form"
          className="claim-search-form"
          onSubmit={handleSubmit}
        >
        <div className="inline-search">
          <label 
            htmlFor="claim-search"
            className="claim-search-label"
            aria-label="claim-search-form"
          >
            <input
              value={plateNumber}
              onChange={e => setPlateNumber(e.target.value.toUpperCase())}
              type="search"
              id="claim-search"
              name="claim-search"
              className="claim-search-input"
              placeholder="Search..."
            />
          </label>

          <label className='plateState-label' htmlFor='plateState'>State: </label>
            <select 
              className='browser-default' 
              value={plateState} 
              onChange={(e) => setPlateState(e.target.value)}
            >
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
        </div>
          <button
            className="search-btn" 
            aria-label="search-btn"
            onClick={() => {setSuccessMessage('')}}
            disabled={!plateNumber || !plateState}
          >
            search
          </button>
        </form>
      </fieldset>
    </div>

    <div className="plate-table">
      {plateTable}
    </div>
    <p>{successMessage}</p>
  </div> 
  )
}

export default claimPlate;



