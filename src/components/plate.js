import React  from 'react'; 
import ReactModal from "react-modal";
import { useModal }  from 'react-modal-hook';

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

export const Plate = (props) => {

  console.log('plate props: ', props)
  const reviews = props.reviews;
  let review = "Loading Reviews";  let plate;
      if (reviews) {
         review = reviews.map((review, index) => { 
          if (review.plateNumber === props.plateName) {
            plate = <p>{review.plateNumber}</p>
          }})
    };

  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <div className="plate">
        <h4>{props.plateName}</h4>
        <div className="karma-wrapper">
          <p className="karma-score">Karma Score: #Number</p>
        </div>
        <p>{review}</p>
        <button onClick={hideModal}>Close</button>
      </div>
    </ReactModal>
  ));

  return (
    // ==== When a User clicks on a plate link inside the review page, this will render
    <button onClick={showModal}>{props.plateName}</button>
  );
};

export default Plate;
