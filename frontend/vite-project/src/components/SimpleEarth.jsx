import React, { useEffect, useState } from 'react';

const SimpleEarth = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading to ensure animation shows properly
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

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
      {!loaded && (
        <div className="loading-text" style={{
          position: 'absolute',
          color: '#0070f3',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Loading Earth...
        </div>
      )}
      
      <div className="earth-container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease'
      }}>
        <div
          className="earth-sphere"
          id="earth"
          style={{
            position: 'relative',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 100px 100px, #5cabff, #000)',
            boxShadow: 'inset 0 0 50px rgba(0,0,0,0.6), 0 0 20px rgba(0, 100, 255, 0.4)',
          }}
        >
          {/* Africa */}
          <div style={{
            position: 'absolute',
            width: '130px',
            height: '170px',
            top: '100px',
            left: '105px',
            background: 'rgba(76, 175, 80, 0.4)',
            borderRadius: '55% 22% 44% 33%'
          }}></div>

          {/* Europe/Asia */}
          <div style={{
            position: 'absolute',
            width: '180px',
            height: '110px',
            top: '50px',
            left: '60px',
            background: 'rgba(76, 175, 80, 0.4)',
            borderRadius: '25% 55% 30% 55%'
          }}></div>

          {/* North America */}
          <div style={{
            position: 'absolute',
            width: '110px',
            height: '130px',
            top: '50px',
            left: '0px',
            background: 'rgba(76, 175, 80, 0.4)',
            borderRadius: '25% 45% 40% 35%',
            transform: 'rotate(-25deg)'
          }}></div>

          {/* South America */}
          <div style={{
            position: 'absolute',
            width: '70px',
            height: '100px',
            top: '180px',
            left: '35px',
            background: 'rgba(76, 175, 80, 0.4)',
            borderRadius: '45% 30% 40% 35%',
            transform: 'rotate(15deg)'
          }}></div>

          {/* Australia */}
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '50px',
            top: '200px',
            right: '40px',
            background: 'rgba(76, 175, 80, 0.4)',
            borderRadius: '45% 25% 45% 35%'
          }}></div>
          
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
          #earth {
            width: 200px;
            height: 200px;
          }
        }

        @media (max-width: 480px) {
          #earth {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleEarth; 