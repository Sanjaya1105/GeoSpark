import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem(`favorites_${currentUser.user._id}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
    
    // Fetch countries data from the API
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://restcountries.com/v3.1/all');
      
      if (!response.ok) {
        throw new Error('Failed to fetch countries data');
      }
      
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data.slice(0, 6)); // Show first 6 countries as featured
      setLoading(false);
    } catch (err) {
      setError('Error loading countries data. Please try again later.');
      setLoading(false);
      console.error('Error fetching countries:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredCountries(countries.slice(0, 6));
      return;
    }
    
    const query = searchQuery.toLowerCase().trim();
    const results = countries.filter(country => 
      country.name.common.toLowerCase().includes(query) || 
      (country.capital && country.capital[0] && country.capital[0].toLowerCase().includes(query)) ||
      (country.region && country.region.toLowerCase().includes(query))
    );
    
    setFilteredCountries(results);
  };

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleFavorite = (country) => {
    const newFavorites = [...favorites];
    const countryIndex = newFavorites.findIndex(fav => fav.cca3 === country.cca3);
    
    if (countryIndex > -1) {
      // Remove from favorites if already exists
      newFavorites.splice(countryIndex, 1);
    } else {
      // Add to favorites
      newFavorites.push({
        cca3: country.cca3,
        name: country.name.common,
        flags: country.flags,
        capital: country.capital,
        region: country.region,
        population: country.population
      });
    }
    
    setFavorites(newFavorites);
    
    // Save to localStorage
    if (user) {
      localStorage.setItem(`favorites_${user._id}`, JSON.stringify(newFavorites));
    }
  };

  const isFavorite = (countryCode) => {
    return favorites.some(fav => fav.cca3 === countryCode);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-700 py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
            alt="World map"
            className="w-full h-full object-cover mix-blend-overlay opacity-20"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            Welcome to Your Dashboard
          </h1>
          {user && (
            <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-blue-100">
              Hello, <span className="font-bold">{user.name}</span>! Ready to explore the world?
            </p>
          )}
          <div className="mt-6 sm:mt-8">
            <button
              onClick={scrollToDashboard}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 md:py-4 md:text-lg shadow-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10">
        <div className="bg-white rounded-xl shadow-xl p-4 sm:p-6 backdrop-blur-lg bg-opacity-95">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Countries</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-2 sm:py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-base placeholder-gray-500"
                    placeholder="Try searching for countries, capitals, or regions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center"
                    >
                      <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Press enter or click search to find your destination
                </p>
              </div>
              <div className="sm:ml-4 sm:mt-8">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Countries Section */}
      <div ref={dashboardRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Countries'}
        </h2>
        
        {loading ? (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-block animate-spin rounded-full h-10 sm:h-12 w-10 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading countries data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-100 text-red-500 mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-500 mb-4">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-600">No countries found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCountries.map((country) => (
              <div
                key={country.cca3}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48 sm:h-56">
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} flag`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(country)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg
                      className={`h-6 w-6 ${isFavorite(country.cca3) ? 'text-yellow-500 fill-current' : 'text-gray-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {country.name.common}
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base text-gray-600">
                    <p>
                      <span className="font-medium">Capital:</span>{' '}
                      {country.capital?.[0] || 'N/A'}
                    </p>
                    <p>
                      <span className="font-medium">Region:</span>{' '}
                      {country.region}
                    </p>
                    <p>
                      <span className="font-medium">Population:</span>{' '}
                      {country.population.toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-4">
                    <Link
                      to={`/country/${country.cca3}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage; 