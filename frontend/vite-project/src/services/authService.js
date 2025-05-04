import axios from 'axios';
import { API_URL as BASE_URL } from '../config';

const API_URL = `${BASE_URL}/api/users`;

// Register user
const register = async (userData) => {
  try {
    console.log('Registering user with API URL:', API_URL);
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Login user
const login = async (credentials) => {
  try {
    console.log('Logging in user with API URL:', API_URL);
    const response = await axios.post(`${API_URL}/login`, credentials);
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Get current user
const getCurrentUser = () => {
  const userString = localStorage.getItem('user');
  if (userString) {
    return JSON.parse(userString);
  }
  return null;
};

// Get user profile
const getUserProfile = async () => {
  try {
    const user = getCurrentUser();
    
    if (!user || !user.token) {
      throw new Error('User not authenticated');
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    
    const response = await axios.get(`${API_URL}/profile`, config);
    return response.data;
  } catch (error) {
    console.error('Get profile error:', error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

// Add a test function to verify API connectivity
const testConnection = async () => {
  try {
    console.log('Testing connection to API URL:', BASE_URL);
    const response = await axios.get(BASE_URL);
    console.log('API response:', response.data);
    return { success: true, message: response.data };
  } catch (error) {
    console.error('API connection test failed:', error);
    return { success: false, error: error.message };
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUserProfile,
  testConnection
};

export default authService; 