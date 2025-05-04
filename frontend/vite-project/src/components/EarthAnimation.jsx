import React, { useEffect, useRef } from 'react';
import './EarthAnimation.css';
import earthTexture from '../images/earth-texture.jpg';

const EarthAnimation = () => {
  const earthRef = useRef(null);

  useEffect(() => {
    // Log to debug
    console.log('EarthAnimation mounted');
    console.log('Earth texture path:', earthTexture);
    
    // Ensure the earth container has the correct background
    if (earthRef.current) {
      earthRef.current.style.backgroundImage = `url(${earthTexture})`;
    }
  }, []);

  return (
    <div className="earth-animation-wrapper">
      <div 
        ref={earthRef}
        className="earth-container"
        style={{ backgroundImage: `url(${earthTexture})` }}
      ></div>
    </div>
  );
};

export default EarthAnimation; 