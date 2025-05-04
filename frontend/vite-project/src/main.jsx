import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FallbackApp from './FallbackApp.jsx';
import './index.css';

console.log('GeoSpark application initializing...');
console.log('Environment:', import.meta.env.MODE);
console.log('API URL:', import.meta.env.VITE_API_URL || 'Not set');

// Error boundary class
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      console.log('Rendering fallback due to error:', this.state.error);
      return <FallbackApp error={this.state.error} />;
    }
    return this.props.children;
  }
}

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
  console.log('React root created and rendered successfully');
} catch (error) {
  console.error('Failed to render React application:', error);
  // Fallback for catastrophic errors outside of React
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1 style="color: #ff0000;">Application Error</h1>
        <p>The application failed to initialize. Please check the console for more details.</p>
        <a href="/debug.html">View Diagnostics</a>
      </div>
    `;
  }
}
