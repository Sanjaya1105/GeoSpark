import React from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleEarth from './SimpleEarth';
import authService from '../services/authService';

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = authService.getCurrentUser() !== null;

  const handleStartJourney = () => {
    navigate('/countries');
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 z-10 pb-6 bg-white sm:pb-10 md:pb-16 lg:pb-28 xl:pb-32 px-4 sm:px-6">
            <main className="mt-4 mx-auto w-full sm:mt-6 md:mt-8 lg:mt-12">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="block">Discover the world with</span>{' '}
                  <span className="block text-blue-600">GeoSpark</span>
                </h1>
                <p className="mt-3 text-sm text-gray-500 sm:mt-4 sm:text-base md:mt-5 md:text-lg">
                  Explore countries, learn about cultures, and discover fascinating facts about our world.
                  Your journey of global discovery starts here.
                </p>
                <div className="mt-6 sm:mt-8">
                  {isLoggedIn ? (
                    <button
                      onClick={() => navigate('/home')}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      Go to Dashboard
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 sm:space-x-4">
                      <button
                        onClick={handleStartJourney}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        Start Your Journey
                      </button>
                      <button
                        onClick={() => navigate('/explore')}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        Explore as Guest
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          {/* Earth Image */}
          <div className="w-full lg:w-1/2 h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-auto">
            <SimpleEarth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
