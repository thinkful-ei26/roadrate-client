import React, { useState, useEffect }  from 'react'; 
import {API_BASE_URL} from '../config';
import { Link } from 'react-router-dom';

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

export const MyPlates = (props) => {
  const [ plates, setPlates ] = useState([]);

  const fetchPlates = async () => {
    let url = `${API_BASE_URL}/plates/all/${localStorage.userId}`;
    console.log(url)
    const response = await fetch(url);
    const plates = await response.json();
    console.log('plateS on fetchPlates', plates)
    setPlates(plates)
    return plates
  }

  useEffect(() => {
    fetchPlates();
  }, []);

  console.log('plates', plates);
  let plate;
  
   if (plates) {
     console.log('PLATES!!')
    plate = plates.map((plate, index) => { 
      console.log('plates exists', plate)
      return (
        <li className='plate-item' key={plate._id} tabIndex='0'>
          <div className='plate-wrapper'>
            <Link to="/plate">
              <button>{plate.plateNumber}</button>
            </Link>
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
        {plate}
      </ul>
    </div>

  );
};

export default MyPlates;