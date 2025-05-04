import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import { API_URL } from '../config';

const AuthDebug = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [apiMessage, setApiMessage] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [testCredentials, setTestCredentials] = useState({
    email: 'test@example.com',
    password: 'testpassword'
  });
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    checkApiConnection();
  }, []);

  const checkApiConnection = async () => {
    try {
      setApiStatus('checking');
      const result = await authService.testConnection();
      if (result.success) {
        setApiStatus('connected');
        setApiMessage(JSON.stringify(result.message));
      } else {
        setApiStatus('failed');
        setApiMessage(result.error || 'Unknown error');
      }
    } catch (error) {
      setApiStatus('error');
      setApiMessage(error.message);
    }
  };

  const testLogin = async () => {
    try {
      setLoginStatus('Attempting login...');
      const response = await authService.login(testCredentials);
      setLoginStatus(`Login successful: ${JSON.stringify(response)}`);
    } catch (error) {
      setLoginStatus(`Login failed: ${error.message || 'Unknown error'}`);
    }
  };

  const testRegister = async () => {
    try {
      setLoginStatus('Attempting registration...');
      // Add a random number to email to avoid duplicate user errors
      const testUser = {
        ...testCredentials,
        email: `test${Math.floor(Math.random() * 10000)}@example.com`,
        name: 'Test User'
      };
      const response = await authService.register(testUser);
      setLoginStatus(`Registration successful: ${JSON.stringify(response)}`);
    } catch (error) {
      setLoginStatus(`Registration failed: ${error.message || 'Unknown error'}`);
    }
  };

  if (!showDebug) {
    return (
      <button 
        onClick={() => setShowDebug(true)}
        style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          zIndex: 1000,
          background: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '8px 16px',
          cursor: 'pointer'
        }}
      >
        Show Auth Debug
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      zIndex: 1000,
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '350px',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h3 style={{ margin: '0 0 10px' }}>Auth Debug Panel</h3>
      <button 
        onClick={() => setShowDebug(false)}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ✕
      </button>

      <div style={{ marginBottom: '15px' }}>
        <strong>API Configuration:</strong>
        <div style={{ fontSize: '14px', wordBreak: 'break-all', marginTop: '5px' }}>
          Base URL: {API_URL}
        </div>
        <div style={{ fontSize: '14px', wordBreak: 'break-all', marginTop: '5px' }}>
          Users Endpoint: {`${API_URL}/api/users`}
        </div>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>API Connection Status:</strong>
        <div style={{ 
          color: apiStatus === 'connected' ? 'green' : apiStatus === 'checking' ? 'blue' : 'red',
          marginTop: '5px'
        }}>
          {apiStatus.toUpperCase()}
        </div>
        {apiMessage && (
          <div style={{ fontSize: '12px', marginTop: '5px', wordBreak: 'break-all' }}>
            {apiMessage}
          </div>
        )}
        <button 
          onClick={checkApiConnection}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Recheck Connection
        </button>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Test Authentication:</strong>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '10px', gap: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={testCredentials.email}
            onChange={(e) => setTestCredentials({...testCredentials, email: e.target.value})}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={testCredentials.password}
            onChange={(e) => setTestCredentials({...testCredentials, password: e.target.value})}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={testLogin}
              style={{
                flex: 1,
                padding: '8px',
                background: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test Login
            </button>
            <button 
              onClick={testRegister}
              style={{
                flex: 1,
                padding: '8px',
                background: '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Test Register
            </button>
          </div>
        </div>
        {loginStatus && (
          <div style={{ 
            fontSize: '12px', 
            marginTop: '10px',
            padding: '8px',
            background: '#f5f5f5',
            borderRadius: '4px',
            wordBreak: 'break-all'
          }}>
            {loginStatus}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthDebug; 