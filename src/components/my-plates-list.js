import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';
import '../styles/my-plates.css'

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

export const MyPlatesList = () => {
  const [ plates, setPlates ] = useState([]);

  const fetchPlates = async () => {
    let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
    // console.log('fetching Plates on: ',url)
    const response = await fetch(url);
    const plates = await response.json();
    // console.log('plateS on fetchPlates', plates)
    setPlates(plates)
    return plates
  }

  useEffect(() => {
    fetchPlates();
    localStorage.removeItem('unclaimedPlate')
  }, []);

  // console.log('plates', plates);
  /* plate is still fetching/loading */
  let plate;

  const myPlateClick = (plate) => {
    // console.log('plate inside li',plate)
    localStorage.setItem('myPlate', plate.plateNumber)
    localStorage.setItem('myState', plate.plateState)
    localStorage.setItem('myPlateId', plate.id)
    localStorage.removeItem('success')
    return plate
  }

  let plateEndpoint = `/my-plates/id/${localStorage.myPlateId}`;

  const noPlatesMessage = () => {
    if(localStorage.hasPlates === '' || !plates) {
      return (
        <p>No plates associated</p>
      )
    }
    return (
      <p>Total Plates Owned: {plates.length}</p>
    )
  }

   if (plates) {
    plate = plates.map((plate, index) => { 
      return (
        <li className='plate-item' key={index} tabIndex='0'>
          <div className='plate-wrapper'>
            <button 
              className="plate"
              onClick={ () => myPlateClick(plate) }
            >
              {plate.plateNumber} - {plate.plateState}
            </button>
          </div>
        </li>
      )
    })
  };

  return (
    <div className="my-plates">
      <Link to="/"
        className="my-plates-back-link"
      >
        Go Back
      </Link>

      {localStorage.unclaimedPlate ? (<p>Successfully unclaimed plate</p>) : (<p></p>)}

      <h2>My Plates</h2>
      {noPlatesMessage()}
      
      <ul className='plates'>
        <Link to={plateEndpoint}>
          {plate}
        </Link>
      </ul>

    </div>

  );
};

export default MyPlatesList;