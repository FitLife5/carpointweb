import React from 'react';
import { CarCard } from './CarCard';
import './CarGrid.css';

export const CarGrid = ({ cars }) => {
  return (
    <section className="car-grid-section" id="catalog">
      <h2 className="section-title">Свіжі оголошення</h2>
      <div className="car-grid">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
};