import { API_URL } from '../config';
import { formatApiUrl } from './apiDebug';

/**
 * Attempts to log in with the provided credentials
 * Includes detailed error handling and logging for debugging
 */
export const loginWithDebug = async (email, password) => {
  console.log(`Attempting login for: ${email}`);
  console.log(`Using API URL: ${API_URL}`);
  
  const loginEndpoint = formatApiUrl('/api/users/login');
  console.log(`Full login endpoint: ${loginEndpoint}`);
  
  try {
    // Make the login request
    const response = await fetch(loginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    // Log the response status
    console.log(`Login response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Login successful, user data received');
      return {
        success: true,
        data
      };
    } else {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        console.error('Login failed with error:', errorData);
        return {
          success: false,
          error: errorData.message || 'Authentication failed'
        };
      } catch (parseError) {
        // If can't parse JSON response
        console.error('Login failed, unable to parse error response:', parseError);
        return {
          success: false,
          error: `Authentication failed with status: ${response.status}`
        };
      }
    }
  } catch (error) {
    // Network or other errors
    console.error('Login network error:', error);
    return {
      success: false,
      error: `Network error: ${error.message}`
    };
  }
};

/**
 * Attempts to register a new user
 * Includes detailed error handling and logging for debugging
 */
export const registerWithDebug = async (userData) => {
  console.log(`Attempting registration for: ${userData.email}`);
  console.log(`Using API URL: ${API_URL}`);
  
  const registerEndpoint = formatApiUrl('/api/users/register');
  console.log(`Full registration endpoint: ${registerEndpoint}`);
  
  try {
    // Make the registration request
    const response = await fetch(registerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    // Log the response status
    console.log(`Registration response status: ${response.status}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Registration successful, user data received');
      return {
        success: true,
        data
      };
    } else {
      // Try to get error details from response
      try {
        const errorData = await response.json();
        console.error('Registration failed with error:', errorData);
        return {
          success: false,
          error: errorData.message || 'Registration failed'
        };
      } catch (parseError) {
        // If can't parse JSON response
        console.error('Registration failed, unable to parse error response:', parseError);
        return {
          success: false,
          error: `Registration failed with status: ${response.status}`
        };
      }
    }
  } catch (error) {
    // Network or other errors
    console.error('Registration network error:', error);
    return {
      success: false,
      error: `Network error: ${error.message}`
    };
  }
}; 