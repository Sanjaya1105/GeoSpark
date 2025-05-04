import React, { useEffect, useState } from 'react';

// Simple fallback component to display if the main app fails to load
const FallbackApp = () => {
  const [apiStatus, setApiStatus] = useState('checking');
  const [apiResponse, setApiResponse] = useState('');
  const [envVariables, setEnvVariables] = useState({});
  
  useEffect(() => {
    // Get environment variables
    const env = {
      API_URL: import.meta.env.VITE_API_URL || 'Not set',
      MODE: import.meta.env.MODE,
      BASE_URL: import.meta.env.BASE_URL
    };
    setEnvVariables(env);
    
    // Check API connection
    if (env.API_URL) {
      fetch(env.API_URL)
        .then(response => {
          if (response.ok) {
            setApiStatus('connected');
            return response.text();
          } else {
            throw new Error(`Status: ${response.status}`);
          }
        })
        .then(text => {
          setApiResponse(text.substring(0, 100) + (text.length > 100 ? '...' : ''));
        })
        .catch(error => {
          setApiStatus(`failed: ${error.message}`);
        });
    } else {
      setApiStatus('API URL not configured');
    }
  }, []);
  
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      maxWidth: '800px',
      margin: '40px auto',
      padding: '20px',
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#0070f3' }}>GeoSpark Diagnostic View</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Application Status</h2>
        <p>This is a fallback component that renders when there might be issues with the main application.</p>
        <a href="/debug.html" style={{ 
          display: 'inline-block',
          background: '#0070f3',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          textDecoration: 'none',
          marginTop: '10px'
        }}>View Detailed Diagnostics</a>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Environment Variables</h2>
        <pre style={{ 
          background: '#f0f0f0', 
          padding: '15px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {JSON.stringify(envVariables, null, 2)}
        </pre>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>API Status</h2>
        <p>Status: <span style={{ 
          color: apiStatus === 'connected' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>{apiStatus}</span></p>
        {apiResponse && (
          <div>
            <h3>Response:</h3>
            <pre style={{ 
              background: '#f0f0f0', 
              padding: '15px', 
              borderRadius: '4px',
              overflow: 'auto'
            }}>{apiResponse}</pre>
          </div>
        )}
      </div>
      
      <div>
        <h2>Next Steps</h2>
        <ol style={{ lineHeight: '1.6' }}>
          <li>Check if your API URL is correctly configured</li>
          <li>Verify that your backend API is running</li>
          <li>Check the browser console for any JavaScript errors</li>
          <li>Try clearing your browser cache and reloading</li>
        </ol>
      </div>
    </div>
  );
};

export default FallbackApp; 