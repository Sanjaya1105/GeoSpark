const jwt = require('jsonwebtoken');

// Set JWT_SECRET in .env file for production
const JWT_SECRET = process.env.JWT_SECRET || 'geospark-secret-key';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: '7d' // Token expires in 7 days
  });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
}; 