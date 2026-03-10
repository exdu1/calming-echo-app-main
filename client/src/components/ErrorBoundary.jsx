// UI for error during rendering rather than a white screen.

import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--ce-color-text-primary)'
        }}>
          <h2 style={{ 
            fontFamily: 'var(--ce-font-family-display)',
            marginBottom: '1rem' 
          }}>
            Something went wrong
          </h2>
          <p style={{ 
            color: 'var(--ce-color-text-secondary)',
            marginBottom: '1.5rem' 
          }}>
            Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'var(--ce-gradient-button)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--ce-radius-lg)',
              fontWeight: 'var(--ce-font-weight-bold)',
              cursor: 'pointer'
            }}
          >
            Refresh
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;