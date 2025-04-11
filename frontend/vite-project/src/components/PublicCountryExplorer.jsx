import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PublicCountryExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  return (
    <div className="pt-16">
      {/* Banner Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-teal-700 py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="World map"
            className="w-full h-full object-cover mix-blend-overlay opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Explore the World
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-green-100">
            Discover countries, capitals, and cultural information from around the globe.
          </p>
          <div className="mt-8 text-center">
            <p className="text-white text-lg">
              Want to save your favorite countries? <Link to="/login" className="font-bold underline hover:text-green-200">Log in</Link> or <Link to="/register" className="font-bold underline hover:text-green-200">register</Link> to access all features!
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-10">
        <div className="bg-white rounded-xl shadow-xl p-6 backdrop-blur-lg bg-opacity-95">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search Countries</label>
                <div className="relative rounded-lg shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-base placeholder-gray-500"
                    placeholder="Try searching for countries, capitals, or regions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
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
              <div className="sm:ml-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Countries Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Countries'}
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600">Loading countries data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        ) : filteredCountries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No countries found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCountries.map((country) => (
              <div key={country.cca3} className="bg-white overflow-hidden shadow rounded-lg relative">
                <div className="h-48 bg-gray-200">
                  {country.flags && (
                    <img 
                      src={country.flags.png} 
                      alt={`Flag of ${country.name.common}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{country.name.common}</h3>
                  <div className="mt-2 text-sm text-gray-500">
                    <p><span className="font-medium">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><span className="font-medium">Region:</span> {country.region}</p>
                    <p><span className="font-medium">Population:</span> {country.population.toLocaleString()}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to={`/public/country/${country.cca3}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Learn More
                    </Link>
                    <div className="text-sm text-gray-500 italic">
                      <Link to="/login" className="text-green-600 hover:text-green-800">
                        Login to favorite
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Ready to track your favorite countries?</h2>
          <p className="mt-4 text-lg text-gray-600">
            Create a free account to save your favorite countries and access more features.
          </p>
          <div className="mt-8">
            <Link to="/register" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Sign up for free
            </Link>
            <Link to="/login" className="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCountryExplorer; 