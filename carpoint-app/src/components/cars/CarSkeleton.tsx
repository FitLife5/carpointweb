import React from 'react';
import './CarSkeleton.css';

export const CarSkeleton: React.FC = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-content">
        <div className="skeleton-line title pulse"></div>
        <div className="skeleton-line price pulse"></div>
        <div className="skeleton-details">
          <div className="skeleton-badge pulse"></div>
          <div className="skeleton-badge pulse"></div>
        </div>
      </div>
    </div>
  );
};