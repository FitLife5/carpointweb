import React from 'react';
import loaderVideo from '../../assets/loader.mp4';
import './Preloader.css';

export const Preloader = () => {
  return (
    <div className="preloader-overlay">
      <video 
        className="preloader-video" 
        src={loaderVideo} 
        autoPlay 
        loop 
        muted 
        playsInline 
      />
    </div>
  );
};