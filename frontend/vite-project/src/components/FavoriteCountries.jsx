import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const FavoriteCountries = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem(`favorites_${currentUser.user._id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const removeFavorite = (countryCode) => {
    const newFavorites = favorites.filter(fav => fav.cca3 !== countryCode);
    setFavorites(newFavorites);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(newFavorites));
    }
  };

  return (
    <div className="pt-16">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl sm:tracking-tight lg:text-5xl">
            Your Favorite Countries
          </h1>
          {user && (
            <p className="mt-4 max-w-2xl mx-auto text-lg text-yellow-100">
              View and manage your collection of favorite countries.
            </p>
          )}
        </div>
      </div>

      {/* Favorites Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
            <p className="mt-4 text-gray-600">Loading your favorites...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12 bg-white shadow rounded-lg p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">You don't have any favorite countries yet</h3>
            <p className="mt-2 text-gray-600">
              Explore countries and click the star icon to add them to your favorites.
            </p>
            <div className="mt-6">
              <Link
                to="/home"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Explore Countries
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {favorites.length} {favorites.length === 1 ? 'Country' : 'Countries'} in Your Favorites
              </h2>
              <Link
                to="/home"
                className="text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Explore
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((country) => (
                <div key={country.cca3} className="bg-white overflow-hidden shadow rounded-lg relative">
                  <div className="absolute top-2 right-2 z-10">
                    <button 
                      onClick={() => removeFavorite(country.cca3)}
                      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                      aria-label="Remove from favorites"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6" 
                        fill="gold" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        strokeWidth="0"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="h-48 bg-gray-200">
                    {country.flags && (
                      <img 
                        src={country.flags.png} 
                        alt={`Flag of ${country.name}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">{country.name}</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p><span className="font-medium">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
                      <p><span className="font-medium">Region:</span> {country.region}</p>
                      <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/country/${country.cca3}`}
                        className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteCountries; 