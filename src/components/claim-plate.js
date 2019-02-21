import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export const claimPlate = (props) => {
  const [ plateNumber, setPlateNumber ] = useState('');
  const [ plateState, setPlateState ] = useState('');
  const [ successMessage, setSuccessMessage ] = useState('');
  const [ plates, setPlates ] = useState('before search');


  const handleRegisterPlate = (e) => {
    e.preventDefault();
    const userId = localStorage.userId;

    localStorage.setItem('myPlate', plateNumber)
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
      console.log('res inside handleSubmit', res);

      return res.json();
    })
    .then(data => {
      console.log('DATA REGISTER PLATE:', data)
      setSuccessMessage('Congrats! Your plate was registered.')
      return data
    })
    .catch(err => console.log(err))
  }

  const handleLinkClick = e => {
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
      console.log('res inside handleLink >>>', res);
      return res.json();
    })
    .then(data => {
      console.log('DATA CLAIM PLATE link:', data)
      setSuccessMessage('Congrats! Your plate was registered.')
      return data
    })
    .catch(err => console.log(err))
  }

  /* ========= SEARCH LICENSE PLATE TO LINK ========== */
  const handleSubmit = e => {
    e.preventDefault(); 

    // console.log(`${API_BASE_URL}/plates/?state=${plateState}&search=${plateNumber}`)
    return fetch(`${API_BASE_URL}/plates/?state=${plateState}&search=${plateNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.authToken}`
      }
    })
    .then(res => {
      console.log('response: >>>', res.body)
      return res.json();
      })
    .then(data => {
      console.log('data on searchPlate',data);
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

  let plateTable;

  if (plates && plates !== 'before search') {
    plateTable = (
      <table>
        <tr>
          <th>License Plate</th>
          <th>Karma Score</th> 
          <th>Ratings</th>
          <th>Register Your Plate</th>
        </tr>
        <tr>
          <td>{plates.plateNumber}</td>
          <td>{plates.karma}</td>
          {/* need to get reviews.length of all of the reviews that have ever mentioned this license plate */}
          <td>0</td>
          <td>
            <button 
              className='link-to-user-button' 
              onClick={(e) => handleLinkClick(e)}
            >
              Link
            </button>
          </td>
        </tr>
      </table>
    )
  } else if (plates) {
    plateTable = (
      <table>
      <tr>
        <th>License Plate</th>
        <th>Karma Score</th> 
        <th>Ratings</th>
        <th>Register Your Plate</th>
      </tr>
      <p>Please Search for a Valid Plate</p>
    </table>
    )
  } else {
    plateTable = (
      <table>
        <tr>
          <th>License Plate</th>
          <th>Karma Score</th> 
          <th>Ratings</th>
          <th>Register Your Plate</th>
        </tr>
        <tr>
          <td>{plateNumber}</td>
          <td>No Karma Score Yet!</td>
          {/* need to get reviews.length of all of the reviews that have ever mentioned this license plate */}
          <td>No Reviews Yet!</td>
          <td>
          <button className='register-plate' onClick={(e) => handleRegisterPlate(e)}>Register Plate</button>
          </td>
        </tr>
      </table>
    )
  }

  return (
    <div className="claimPlate">
    <h2>Claim A Plate</h2>

    <Link to="/" className="plates-back-link">
      <button>Go Back</button>
    </Link>

     <fieldset>
      <legend>License Plate Number</legend>
      <form 
        id="search-form"
        className="search-form"
        onSubmit={handleSubmit}
      >
        <label 
          htmlFor="search"
          className="search-label"
          aria-label="search-form"
        >
          <input
            value={plateNumber}
            onChange={e => setPlateNumber(e.target.value)}
            type="search"
            id="search"
            name="search"
            className="search-input"
            placeholder="Search..."
          />
        </label>

        <label htmlFor='plateState'>State: 
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
        </label>

        <button
          className="search-btn" 
          aria-label="search-btn"
          disabled={!plateNumber || !plateState}
        >
          search
        </button>
      </form>
    </fieldset>

    <div className="plate-table">
      {plateTable}
    </div>
    <p>{successMessage}</p>
    </div> 
  )
}

export default claimPlate;



