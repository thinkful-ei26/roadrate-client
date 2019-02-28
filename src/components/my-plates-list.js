import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Redirect, Link } from 'react-router-dom';
// import icon from '../assets/thumbs-up.png';
import '../styles/my-plates.css'

export const MyPlatesList = () => {
  const [ plates, setPlates ] = useState([]);
  const [ redirect, setRedirect ] = useState(false);

  const fetchPlates = async () => {
    let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
    const response = await fetch(url);
    const plates = await response.json();
    setPlates(plates)
    return plates
  }

  useEffect(() => {
    fetchPlates();
    setRedirect(false)
    localStorage.removeItem('responseSuccess')
    localStorage.removeItem('unclaimedPlate')
  }, []);

  let plate;
  const myPlateClick = (plate) => {
    localStorage.setItem('myPlate', plate.plateNumber)
    localStorage.setItem('myState', plate.plateState)
    localStorage.setItem('myPlateId', plate.id)
    localStorage.removeItem('success')
    setRedirect(true);
    return plate
  }
  
  let plateEndpoint = `/my-plates/id/${localStorage.myPlateId}`;

  if (redirect) {
    return <Redirect to={plateEndpoint} />
  }

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
              <span className="plate-text" >
                {plate.plateNumber} - {plate.plateState}
              </span>
            </button>
          </div>
        </li>
      )
    })
  };

  return (
    <div className="my-plates">

      <div className="my-plates-nav">
        <Link to="/" className="my-plates-home-link">Dashboard</Link>
      </div>    
      
        <h2>My Plates</h2>
        {noPlatesMessage()}     
      {/* <img 
        src={icon} 
        alt="icon" 
        className="plates-icon"
      /> */}
      
      <ul className='plates'>
        {plate}
      </ul>

    </div>

  );
};

export default MyPlatesList;