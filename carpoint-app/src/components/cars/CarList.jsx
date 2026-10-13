import React from 'react';
import './CarList.css';

export default function CarList({ cars }) {
    return (
        <div className="car-grid">
            {cars.map((car) => (
                <div key={car.id} className="car-card">
                    <img src={car.image_url} alt={`${car.brand} ${car.model}`} />
                    <h3>{car.brand} {car.model} ({car.year})</h3>
                    <div className="car-info">
                        <span>{car.mileage} км</span> | <span>{car.fuel_type}</span>
                    </div>
                    <p>{car.description}</p>
                    <div className="price">${car.price}</div>
                </div>
            ))}
        </div>
    );
}