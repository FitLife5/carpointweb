import React, { useState } from 'react';
import { useCarContext } from '../../context/CarContext';
import { supabase } from '../../lib/supabase';
// @ts-ignore
import './AddCarModal.css';

interface AddCarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RANDOM_CAR_IMAGES = [
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80'
];

export const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onClose }) => {
  const { addCar, user } = useCarContext();

  const [formData, setFormData] = useState({
    title: '',
    year: 2023,
    priceUSD: '',
    city: 'Київ',
    mileage: '',
    fuel: 'Бензин',
    gearbox: 'Автомат',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.priceUSD) {
      alert("Будь ласка, заповніть обов'язкові поля!");
      return;
    }

    if (!user) {
      alert("Будь ласка, увійдіть у свій акаунт!");
      return;
    }

    setUploading(true);
    let imageUrl = RANDOM_CAR_IMAGES[Math.floor(Math.random() * RANDOM_CAR_IMAGES.length)];

    // Завантаження власного фото в Supabase Storage, якщо файл обрано
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('car-images')
        .upload(fileName, imageFile);

      if (error) {
        console.error('Помилка завантаження зображення:', error.message);
        alert(`Не вдалося завантажити фото: ${error.message}`);
        setUploading(false);
        return;
      }

      if (data) {
        const { data: publicUrlData } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }
    }

    await addCar({
      title: formData.title,
      year: Number(formData.year),
      priceUSD: Number(formData.priceUSD),
      priceUAH: Number(formData.priceUSD) * 41,
      city: formData.city,
      mileage: formData.mileage ? `${formData.mileage} тис. км` : '0 тис. км',
      fuel: formData.fuel,
      engine: '2.0 л',
      gearbox: formData.gearbox,
      image: imageUrl,
      verified: true,
    });

    setUploading(false);
    setImageFile(null);
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
            Марка та модель *
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
              Ціна ($) *
              <input
                type="number"
                required
                placeholder="20000"
                value={formData.priceUSD}
                onChange={(e) => setFormData({ ...formData, priceUSD: e.target.value })}
              />
            </label>

            <label>
              Рік випуску
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Місто
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </label>

            <label>
              Пробіг (тис. км)
              <input
                type="number"
                placeholder="150"
                value={formData.mileage}
                onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Тип палива
              <select
                value={formData.fuel}
                onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
              >
                <option value="Бензин">Бензин</option>
                <option value="Дизель">Дизель</option>
                <option value="Газ/Бензин">Газ/Бензин</option>
                <option value="Електро">Електро</option>
                <option value="Гібрид">Гібрид</option>
              </select>
            </label>

            <label>
              Коробка передач
              <select
                value={formData.gearbox}
                onChange={(e) => setFormData({ ...formData, gearbox: e.target.value })}
              >
                <option value="Автомат">Автомат</option>
                <option value="Механіка">Механіка</option>
              </select>
            </label>
          </div>

          <label>
            Завантажити фото автомобіля (опціонально)
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            />
          </label>

          <button type="submit" className="submit-btn" disabled={uploading}>
            {uploading ? 'Завантаження авто та фото...' : 'Опублікувати авто'}
          </button>
        </form>
      </div>
    </div>
  );
};