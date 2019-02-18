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

export const Plate = () => {
  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen>
      <div className="plate">
        <h4>PLATE NUMBER</h4>
        <div className="karma-wrapper">
          <p className="karma-score">Karma Score: #Number</p>
        </div>
        <p>INSERT PLATE REVIEWS COMPONENT</p>
        <button onClick={hideModal}>Close</button>
      </div>
    </ReactModal>
  ));

  return (
    // ==== When a User clicks on a plate link inside the review page, this will render
    <button onClick={showModal}>Show Plate Reviews</button>
  );
};

export default Plate;
