import React from 'react';

const Modal = ({ content, buttonText, handleButtonClick }) => (
  <div className="modal">
    <div className="modal-content">
      <p>{content}</p>
      <button onClick={handleButtonClick}>{buttonText}</button>
    </div>
  </div>
);

export default Modal;
