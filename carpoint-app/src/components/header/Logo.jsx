import React from 'react';
import logoImg from '../../assets/logo.png';
import './Logo.css';

export const Logo = () => {
  return (
    <div className="logo-container">
      <img src={logoImg} alt="CarPoint Logo" className="logo-image" />
    </div>
  );
};