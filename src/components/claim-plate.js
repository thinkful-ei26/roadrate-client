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
      return res.json();
      })
    .then(data => {
      console.log('fetch response', data);
      setPlates(data)
    })
    .catch(err => {
      setPlates('');
      if(err === 'TypeError: Failed to fetch'){
        return Promise.reject(err)
      }
      console.log(err)
      });
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
        isOwned: true
      })
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      setSuccessMessage(`Congrats! Your plate ${localStorage.myPlate} - ${localStorage.myState} was registered.`)
      return data
    })
    .catch(err => {
      alert("We're sorry. Something went wrong.")
      console.log(err);
    });
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
        plateState,
        isOwned: true
      })
    })
    .then(res => {
      setSuccessMessage(`Congrats! Your plate ${localStorage.myPlate} - ${localStorage.myState} was registered.`)
      console.log(res)
      return res.json();
    })
    .catch(err => {
      alert("We're sorry. Something went wrong.")
      console.log(err);
    });
  }

  /* ========= DYNAMIC SEARCH RESULT TABLE ========== */
  let plateTable;
  let plate;

  console.log(plates)
  // console.log(plates[0].isOwned)
  // console.log('plate number', plateNumber)
  // console.log('plates userId', plates.userId)
    if (Array.isArray(plates)) {
      console.log('here')
      if (plates.length === 0 || plates === undefined) {
        console.log('here level2')
          // if the plateNumber is not in DB, then allow user to create a new plate & register it as theirs
          plate = (
            <div className='plate-list-item'>
            
              <li><span className="mobile-hide">License</span> Plate: {plateNumber}</li>
              <li>State: {plateState}</li>
              <li>Register <span className="mobile-hide">Your Plate</span></li>
                      
                <button 
                  className='register-plate' 
                  onClick={(e) => handleRegisterPlate(e)}
                  disabled={successMessage}
                >
                  Register Plate
                </button>
                
            </div>
          )
      } else if (plateNumber === '') {
          plate = (
            <div className='plate-list-item'>
          
              <li><span className="mobile-hide">License</span> Plate: {plateNumber}</li>
              <li>State: {plateState}</li>
              <li>Register <span className="mobile-hide">Your Plate</span></li>
                      
          </div>
          )
      } else if (plates.length) {
        console.log('here 2')
          plate = plates.map(plate => {
          if (plate.isOwned) {
            return (
            <div className="plateTable">
              <div className='plate-list-item'>
              <li><span className="mobile-hide">License</span> Plate: {plate.plateNumber}</li>
                <li>State: {plate.plateState}</li>
                <li>Register <span className="mobile-hide">Your Plate</span></li>
                <li>ALREADY CLAIMED</li> 
                <p>Need to <strong>Unlink</strong> your plate? Go to: </p>
                <Link to="/my-plates">
                  <span className="my-plates-link">My Plates</span>
                </Link>       
                </div>     
              </div>
            )
          } else {
            return (
              <div className='plate-list-item'>
                <li><span className="mobile-hide">License</span> Plate: {plate.plateNumber}</li>
                <li>State: {plate.plateState}</li>       
                <button 
                  className='add-to-user-button' 
                  onClick={(e) => {handleClaimClick(e)}}
                  disabled={successMessage}
                  >Claim
                </button>
              </div>
            );
          } 
        });
      } else {
        return plate = (<p>Submit a search</p>)
      }
    }


  /* ========= RENDER CLAIM PLATE PAGE ========== */
  return (
    
    <div className="claimPlate">
      <div className="my-plates-nav"> 
        <Link to="/" className="my-plates-home-link">
          Dashboard
        </Link> 
     </div>
      
    <h2>Claim A Plate:</h2>

    <div className="claim-search">
     <fieldset id="claim-plate-search">
      <legend>Search a Valid Plate by State</legend>
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
              placeholder="Search plate numbers"
              pattern="^[a-zA-Z0-9]{1,8}$" 
              title="Plate number should be between 1 to 8 characters without special characters."
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
      {plate}
    </div>
    <p>{successMessage}</p>
  </div> 
  )
}

export default claimPlate;

