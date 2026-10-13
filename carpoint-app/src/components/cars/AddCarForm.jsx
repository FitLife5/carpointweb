import React, { useState } from 'react';
import { useCarContext } from '../../context/CarContext';
import './AddCarModal.css';

// Масив із випадковими якісними фото авто
const RANDOM_CAR_IMAGES = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
];

export const AddCarModal = ({ isOpen, onClose }) => {
  const { addCar } = useCarContext();

  const [formData, setFormData] = useState({
    title: '',
    year: 2023,
    priceUSD: '',
    city: 'Київ',
    mileage: '',
    fuel: 'Бензин',
    gearbox: 'Автомат',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.priceUSD) return;

    // Вибираємо випадкову фотографію з масиву
    const randomImage = RANDOM_CAR_IMAGES[Math.floor(Math.random() * RANDOM_CAR_IMAGES.length)];

    const newCar = {
      id: Date.now(), // Унікальний ID
      title: formData.title,
      year: Number(formData.year),
      priceUSD: Number(formData.priceUSD),
      priceUAH: Number(formData.priceUSD) * 41,
      city: formData.city,
      mileage: `${formData.mileage} тис. км`,
      fuel: formData.fuel,
      engine: '2.0 л',
      gearbox: formData.gearbox,
      image: randomImage, // Кожного разу різна фотка
      verified: true,
    };

    // Додаємо в глобальний стан
    addCar(newCar);

    // Очищаємо форму та закриваємо модальне вікно
    setFormData({
      title: '',
      year: 2023,
      priceUSD: '',
      city: 'Київ',
      mileage: '',
      fuel: 'Бензин',
      gearbox: 'Автомат',
    });
    
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Додати оголошення</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Марка та модель
            <input 
              type="text" 
              placeholder="напр. Audi A6" 
              required 
              value={formData.title} 
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
            />
          </label>

          <div className="form-row">
            <label>
              Ціна ($)
              <input 
                type="number" 
                placeholder="15000" 
                required 
                value={formData.priceUSD} 
                onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })} 
              />
            </label>
            <label>
              Рік випуску
              <input 
                type="number" 
                value={formData.year} 
                onChange={(e) => setFormData({ ...formData, year: e.target.value })} 
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Пробіг (тис. км)
              <input 
                type="number" 
                placeholder="85" 
                required 
                value={formData.mileage} 
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })} 
              />
            </label>
            <label>
              Місто
              <input 
                type="text" 
                value={formData.city} 
                onChange={(e) => setFormData({ ...formData, city: e.target.value })} 
              />
            </label>
          </div>

          <button type="submit" className="submit-btn">Опублікувати авто</button>
        </form>
      </div>
    </div>
  );
};