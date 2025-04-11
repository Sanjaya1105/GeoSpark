import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Make sure react-router-dom is properly mocked
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    // Add any specific mocks here
  };
});

// Custom render to include router provider
const customRender = (ui, options) => {
  return render(ui, { 
    wrapper: ({ children }) => <HashRouter>{children}</HashRouter>,
    ...options 
  });
};

// Helper to setup userEvent
const setup = (jsx) => {
  return {
    user: userEvent.setup(),
    ...customRender(jsx),
  };
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render, setup }; 