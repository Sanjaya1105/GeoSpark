import React from 'react';

const EarthFallback = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '500px'
    }}>
      <div style={{
        width: '30em',
        height: '30em',
        position: 'relative',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #6ab7ff 0%, #1a73e8 40%, #0c4ca1 80%, #022b69 100%)',
        boxShadow: 'inset 0 0 3em rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 200, 255, 0.6), 0 0 40px rgba(0, 200, 255, 0.3)',
        animation: 'rotate 20s linear infinite',
      }}>
        {/* Continents approximation */}
        <div style={{
          position: 'absolute',
          width: '40%',
          height: '30%',
          top: '15%',
          left: '30%',
          background: 'rgba(0, 255, 0, 0.3)',
          borderRadius: '50%',
          transform: 'rotate(15deg)',
        }}></div>
        <div style={{
          position: 'absolute',
          width: '30%',
          height: '25%',
          top: '55%',
          left: '40%',
          background: 'rgba(0, 255, 0, 0.3)',
          borderRadius: '40% 30% 40% 20%',
          transform: 'rotate(-15deg)',
        }}></div>
        <div style={{
          position: 'absolute',
          width: '20%',
          height: '20%',
          top: '30%',
          left: '10%',
          background: 'rgba(0, 255, 0, 0.3)',
          borderRadius: '40%',
        }}></div>
        <div style={{
          position: 'absolute',
          width: '15%',
          height: '25%',
          top: '25%',
          right: '20%',
          background: 'rgba(0, 255, 0, 0.3)',
          borderRadius: '50% 40% 30% 30%',
        }}></div>
      </div>
      <style jsx="true">{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @media (max-width: 768px) {
          div > div {
            width: 20em;
            height: 20em;
          }
        }
        @media (max-width: 480px) {
          div > div {
            width: 15em;
            height: 15em;
          }
        }
      `}</style>
    </div>
  );
};

export default EarthFallback; 