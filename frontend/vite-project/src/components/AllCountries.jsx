import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [regions, setRegions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser.user);
    }
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      const data = await response.json();
      setCountries(data);
      
      // Extract unique regions
      const uniqueRegions = [...new Set(data.map(country => country.region))].filter(Boolean).sort();
      setRegions(uniqueRegions);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const filteredCountries = selectedRegion
    ? countries.filter(country => country.region === selectedRegion)
    : countries;

  const formatPopulation = (population) => {
    return new Intl.NumberFormat('en-US').format(population);
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with Region Filters */}
          <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md h-fit sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Region</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="all"
                  name="region"
                  value=""
                  checked={selectedRegion === ''}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="all" className="ml-2 text-gray-700">All Regions</label>
              </div>
              {regions.map((region) => (
                <div key={region} className="flex items-center">
                  <input
                    type="radio"
                    id={region}
                    name="region"
                    value={region}
                    checked={selectedRegion === region}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor={region} className="ml-2 text-gray-700">{region}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Countries List */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">All Countries</h1>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredCountries.map((country) => (
                  <Link
                    key={country.cca3}
                    to={user ? `/country/${country.cca3}` : `/public/country/${country.cca3}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center p-6">
                      <div className="relative w-24 h-16 overflow-hidden rounded-lg">
                        <img
                          src={country.flags.png}
                          alt={`Flag of ${country.name.common}`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="ml-6 flex-1">
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {country.name.common}
                        </h2>
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div>
                            <span className="font-medium text-gray-900">Capital:</span>{' '}
                            <span className="text-gray-600">{country.capital?.[0] || 'N/A'}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Region:</span>{' '}
                            <span className="text-gray-600">{country.region}</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-900">Population:</span>{' '}
                            <span className="text-gray-600">{formatPopulation(country.population)}</span>
                          </div>
                          {country.languages && (
                            <div>
                              <span className="font-medium text-gray-900">Languages:</span>{' '}
                              <span className="text-gray-600">
                                {Object.values(country.languages).slice(0, 2).join(', ')}
                                {Object.values(country.languages).length > 2 && '...'}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCountries;