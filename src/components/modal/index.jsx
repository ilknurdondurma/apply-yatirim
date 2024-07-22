import React from 'react';

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-1/2">
        <button onClick={onClose} className="absolute top-2 right-2">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
