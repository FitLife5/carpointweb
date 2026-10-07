import React, { useState } from 'react';
import './FavoriteButton.css';

export const FavoriteButton = () => {
  const [active, setActive] = useState(false);

  return (
    <button 
      className={`btn-favorite ${active ? 'active' : ''}`} 
      onClick={() => setActive(!active)}
      title="Додати в обране"
    >
      ♥
    </button>
  );
};