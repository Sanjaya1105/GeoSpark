import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const PublicCountryDetails = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch country details');
        }
        
        const data = await response.json();
        setCountry(data[0]);
        setLoading(false);
      } catch (err) {
        setError('Error loading country details. Please try again later.');
        setLoading(false);
        console.error('Error fetching country details:', err);
      }
    };

    if (countryCode) {
      fetchCountryDetails();
    }
  }, [countryCode]);

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          <p className="mt-4 text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="mt-6">
          <Link to="/explore" className="text-green-600 hover:text-green-800">
            &larr; Back to countries
          </Link>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-12">
          <p className="text-gray-600">Country not found.</p>
        </div>
        <div className="mt-6">
          <Link to="/explore" className="text-green-600 hover:text-green-800">
            &larr; Back to countries
          </Link>
        </div>
      </div>
    );
  }

  // Extract relevant data
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies 
    ? Object.values(country.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ') 
    : 'N/A';

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/explore" className="text-green-600 hover:text-green-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to explore
          </Link>
          <div>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Log in to add to favorites
            </Link>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-green-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">{country.name.common}</h1>
                <p className="mt-1 text-xl">{country.name.official}</p>
              </div>
              {country.coatOfArms && country.coatOfArms.png && (
                <img 
                  src={country.coatOfArms.png} 
                  alt={`Coat of arms of ${country.name.common}`} 
                  className="h-16 w-16 object-contain"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <div className="mb-8">
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={country.flags.svg} 
                    alt={`Flag of ${country.name.common}`} 
                    className="w-full h-auto"
                  />
                  {country.flags.alt && (
                    <div className="p-4 text-sm text-gray-600 italic">
                      {country.flags.alt}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Location</h2>
                {country.maps && country.maps.googleMaps && (
                  <a 
                    href={country.maps.googleMaps} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    View on Google Maps
                  </a>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">Country Information</h2>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Capital</dt>
                  <dd className="mt-1 text-sm text-gray-900">{country.capital ? country.capital[0] : 'N/A'}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Region</dt>
                  <dd className="mt-1 text-sm text-gray-900">{country.region} {country.subregion ? `(${country.subregion})` : ''}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Population</dt>
                  <dd className="mt-1 text-sm text-gray-900">{country.population.toLocaleString()}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Area</dt>
                  <dd className="mt-1 text-sm text-gray-900">{country.area.toLocaleString()} km²</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Languages</dt>
                  <dd className="mt-1 text-sm text-gray-900">{languages}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Currencies</dt>
                  <dd className="mt-1 text-sm text-gray-900">{currencies}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Timezone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{country.timezones.join(', ')}</dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">Driving Side</dt>
                  <dd className="mt-1 text-sm text-gray-900 capitalize">{country.car.side}</dd>
                </div>
                {country.borders && country.borders.length > 0 && (
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Bordering Countries</dt>
                    <dd className="mt-1 text-sm text-gray-900">{country.borders.join(', ')}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-green-50 rounded-lg mt-8 p-6 shadow-sm">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-900">Want to save this country to your favorites?</h3>
            <p className="mt-2 text-green-700">
              Create a free account to save your favorite countries and access all features.
            </p>
            <div className="mt-4">
              <Link to="/register" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Sign up for free
              </Link>
              <Link to="/login" className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCountryDetails; 