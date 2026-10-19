import React, { useState } from 'react';
import { useCarContext } from '../../context/CarContext';
import { CarSkeleton } from './CarSkeleton';
import './CarGrid.css';

export const CarGrid: React.FC = () => {
  const { cars, favorites, toggleFavorite, user, loading } = useCarContext();
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  const displayedCars = filter === 'favorites'
    ? cars.filter((car) => favorites.includes(car.id))
    : cars;

  return (
    <div className="car-grid-container">
      {/* Навігація вкладок */}
      <div className="tabs-navigation">
        <button
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Усі оголошення ({cars.length})
        </button>
        {user && (
          <button
            className={`tab-btn ${filter === 'favorites' ? 'active' : ''}`}
            onClick={() => setFilter('favorites')}
          >
            ❤️ Обрані ({favorites.length})
          </button>
        )}
      </div>

      {/* Відображення скелетонів при завантаженні */}
      {loading ? (
        <div className="car-grid">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CarSkeleton key={n} />
          ))}
        </div>
      ) : displayedCars.length === 0 ? (
        <div className="empty-state">
          {filter === 'favorites'
            ? 'У вас поки немає збережених авто.'
            : 'Оголошень поки немає.'}
        </div>
      ) : (
        <div className="car-grid">
          {displayedCars.map((car, index) => {
            const isFav = favorites.includes(car.id);
            return (
              <div
                key={car.id}
                className="car-card"
                /* Каскадна затримка для ефекту плавного входу (Stagger animation) */
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="car-image-container">
                  <img src={car.image} alt={car.title} className="car-image" />
                  <button
                    className={`fav-button ${isFav ? 'is-favorite' : ''}`}
                    onClick={() => toggleFavorite(car.id)}
                    title={isFav ? 'Видалити з обраного' : 'Зберегти в обране'}
                  >
                    {isFav ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="car-info">
                  <h3>{car.title}, {car.year}</h3>
                  <div className="car-price">
                    <span className="price-usd">${car.priceUSD.toLocaleString()}</span><br/>
                    <span className="price-uah">{car.priceUAH.toLocaleString()} грн</span>
                  </div>
                  <div className="car-details">
                    <span>📍 {car.city}</span>
                    <span>🛣️ {car.mileage}</span>
                    <span>⛽ {car.fuel}</span>
                    <span>🕹️ {car.gearbox}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};