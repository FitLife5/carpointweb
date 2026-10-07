import React from 'react';
import { FavoriteButton } from '../buttons/FavoriteButton';
import './CarCard.css';

export const CarCard = ({ car }) => {
  return (
    <div className="car-card">
      <div className="car-image-wrapper">
        <img src={car.image} alt={car.title} className="car-image" />
        <div className="fav-wrapper">
          <FavoriteButton />
        </div>
        {car.verified && <span className="badge-verified">✓ VIN Перевірено</span>}
      </div>
      <div className="car-content">
        <h3 className="car-title">{car.title} {car.year}</h3>
        <div className="car-price-group">
          <span className="price-usd">${car.priceUSD.toLocaleString()}</span>
          <span className="price-uah">{car.priceUAH.toLocaleString()} грн</span>
        </div>
        <div className="car-specs">
          <span>🚗 {car.mileage}</span>
          <span>📍 {car.city}</span>
          <span>⛽ {car.fuel}, {car.engine}</span>
          <span>⚙️ {car.gearbox}</span>
        </div>
      </div>
    </div>
  );
};