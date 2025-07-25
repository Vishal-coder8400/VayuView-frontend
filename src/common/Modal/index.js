import React, { forwardRef, useImperativeHandle, useState } from 'react';
import './style.scss'; // Import the SCSS file

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Expose openModal and closeModal methods using useImperativeHandle
  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  );
});

export default Modal;
