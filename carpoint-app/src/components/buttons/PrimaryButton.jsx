import React from 'react';
import './PrimaryButton.css';

export const PrimaryButton = ({ text, onClick, type = "button" }) => {
  return (
    <button className="btn-primary" type={type} onClick={onClick}>
      {text}
    </button>
  );
};