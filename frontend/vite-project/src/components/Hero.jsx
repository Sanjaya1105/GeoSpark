import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EarthAnimation from './EarthAnimation';
import EarthFallback from './EarthFallback';
import authService from '../services/authService';

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.getCurrentUser() !== null;
  const [useEarthFallback, setUseEarthFallback] = useState(false);

  useEffect(() => {
    // Try to load the earth texture image to determine if we need the fallback
    const img = new Image();
    img.src = new URL('../images/earth-texture.jpg', import.meta.url).href;
    
    const timeout = setTimeout(() => {
      // If image takes too long to load, use fallback
      setUseEarthFallback(true);
    }, 2000);
    
    img.onload = () => {
      clearTimeout(timeout);
      setUseEarthFallback(false);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      setUseEarthFallback(true);
    };
    
    return () => clearTimeout(timeout);
  }, []);

  const handleStartJourney = () => {
    navigate('/countries');
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-6 mx-auto max-w-3xl px-2 sm:mt-8 sm:px-4 md:mt-10 lg:mt-12 lg:px-6 xl:mt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Discover the world with</span>{' '}
                  <span className="block text-blue-600 xl:inline">GeoSpark</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Explore countries, learn about cultures, and discover fascinating facts about our world.
                  Your journey of global discovery starts here.
                </p>
                <div className="mt-8 sm:mt-10">
                  {isLoggedIn ? (
                    <button
                      onClick={() => navigate('/home')}
                      className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                    >
                      Go to Dashboard
                    </button>
                  ) : (
                    <div className="space-x-4">
                      <button
                        onClick={handleStartJourney}
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Start Your Journey
                      </button>
                      <button
                        onClick={() => navigate('/explore')}
                        className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Explore as Guest
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          {/* Earth Animation with Fallback */}
          <div className="w-full lg:w-1/2 h-[400px] sm:h-[500px] md:h-[600px] lg:h-auto">
            {useEarthFallback ? <EarthFallback /> : <EarthAnimation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
