import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export const CreatePlateForm = () => {
    const [ plateNumber, setPlateNumber ] = useState('');
    const [ plateState, setPlateState ] = useState('');
    const [ plate, setPlate ] = useState("");

    const storePlate = plate => {
        localStorage.getItem("plate");
        setPlate(plate);
      };

    console.log('plate:', storePlate);

    const handleClick = () => {
        if (localStorage.myPlate){
            return (
                new alert ('Congrats! Your plate has been registered.')
            )
        }   
    }

    //put request to regular plate endpoint
    //find on the query to match the 
    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.userId;

        localStorage.setItem('myPlate', plateNumber)

        return fetch(`${API_BASE_URL}/plates`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${localStorage.authToken}`
            },
            body: JSON.stringify({
              plateNumber,
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
            return data
          })
          .catch(err => console.log(err))
        }


    return (
        <div className="claimPlate">
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
                placeholder="Enter A Valid License Plate Number"
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
            <button className="new-plate-submit" onClick={handleClick}>
                Register
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