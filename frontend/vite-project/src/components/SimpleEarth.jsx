import React, { useEffect, useState } from 'react';
import staticEarthImage from '../images/static_earth.jpg';

const SimpleEarth = () => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading to ensure animation shows properly
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      minHeight: '400px',
      position: 'relative'
    }}>
      {(!loaded || !imageLoaded) && (
        <div className="loading-text" style={{
          position: 'absolute',
          color: '#0070f3',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Loading Earth...
        </div>
      )}
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: loaded && imageLoaded ? 1 : 0,
        transition: 'opacity 1s ease'
      }}>
        <div
          style={{
            position: 'relative',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 0 20px rgba(0, 100, 255, 0.4)',
          }}
        >
          <img 
            src={staticEarthImage} 
            alt="Earth" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onLoad={handleImageLoad}
          />
          
          {/* Earth glow effect */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            left: '-20px',
            right: '-20px',
            bottom: '-20px',
            borderRadius: '50%',
            boxShadow: '0 0 40px rgba(0, 140, 255, 0.3)',
            zIndex: -1
          }}></div>
        </div>
      </div>

      <style jsx="true">{`
        @media (max-width: 768px) {
          img {
            width: 200px !important;
            height: 200px !important;
          }
          div > div > div {
            width: 200px !important;
            height: 200px !important;
          }
        }

        @media (max-width: 480px) {
          img {
            width: 150px !important;
            height: 150px !important;
          }
          div > div > div {
            width: 150px !important;
            height: 150px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleEarth; 