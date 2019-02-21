import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import MyPlate from './my-plate';

// fetch call, get all reviews about that plateid === _id from plate 
// button "comment" on review => comment form
// submit make PUT req to change the specific review

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

export const PlateList = (props) => {
  const [ plates, setPlates ] = useState([]);

  const fetchPlates = async () => {
    let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
    console.log('fetching Plates on: ',url)
    const response = await fetch(url);
    const plates = await response.json();
    console.log('plateS on fetchPlates', plates)
    setPlates(plates)
    return plates
  }

  useEffect(() => {
    fetchPlates();
  }, []);

  // console.log('plates', plates);
  /* plate is still fetching/loading */
  let plate;

  const myPlateClick = (plate) => {
    console.log('plate inside li',plate)
    localStorage.setItem('myPlate', plate.plateNumber)
    localStorage.setItem('myState', plate.plateState)
    return plate
  }

   if (plates) {
    plate = plates.map((plate, index) => { 
      console.log('plates exists', plate)
      return (
        <li className='plate-item' key={index} tabIndex='0'>
          <div className='plate-wrapper'>
            <button 
              onClick={ () => myPlateClick(plate) }
            >
              {plate.plateNumber}
            </button>
          </div>
        </li>
      )
    })
  };

  return (
    <div className="my-plates">
      <Link to="/" className="plates-back-link">
        <button>Go Back</button>
      </Link>
      <h2>My Plates</h2>
      <ul className='plates'>
        <Link to="/my-plate">
          {plate}
        </Link>
      </ul>
    </div>

  );
};

export default PlateList;