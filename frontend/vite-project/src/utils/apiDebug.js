import { API_URL } from '../config';

/**
 * Debug utility to test API connectivity
 */
export const testApiConnection = async () => {
  try {
    console.log(`Testing API connection to: ${API_URL}`);
    
    // Make a simple request to the API root
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      const text = await response.text();
      console.log('API connection successful:', text);
      return {
        success: true,
        message: text,
        status: response.status
      };
    } else {
      console.error('API connection failed with status:', response.status);
      return {
        success: false,
        message: `Status code: ${response.status}`,
        status: response.status
      };
    }
  } catch (error) {
    console.error('API connection error:', error.message);
    return {
      success: false,
      message: error.message,
      error
    };
  }
};

/**
 * Helper to properly format API endpoints
 * @param {string} endpoint - The API endpoint (should start with /)
 */
export const formatApiUrl = (endpoint) => {
  // Ensure endpoint starts with / and API_URL doesn't end with /
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${baseUrl}${formattedEndpoint}`;
}; 