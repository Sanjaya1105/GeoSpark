import React from 'react';
import { render, screen, fireEvent } from '../utils/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Hero from '../../components/Hero';
import authService from '../../services/authService';

// Mock the dependencies
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

vi.mock('../../services/authService', () => ({
  default: {
    getCurrentUser: vi.fn()
  }
}));

vi.mock('../../components/EarthAnimation', () => ({
  default: () => <div data-testid="earth-animation" />
}));

// Mock navigate function
const mockNavigate = vi.fn();

describe('Hero Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('renders hero section with correct heading and description', () => {
    // Mock user not logged in
    authService.getCurrentUser.mockReturnValue(null);
    
    render(<Hero />);
    
    // Check if the heading is rendered
    expect(screen.getByText(/Discover the world with/i)).toBeInTheDocument();
    expect(screen.getByText(/GeoSpark/i)).toBeInTheDocument();
    
    // Check if the description is rendered
    expect(screen.getByText(/Explore countries, learn about cultures/i)).toBeInTheDocument();
  });
  
  it('renders start journey and explore as guest buttons when user is not logged in', () => {
    // Mock user not logged in
    authService.getCurrentUser.mockReturnValue(null);
    
    render(<Hero />);
    
    // Check if both buttons are present
    expect(screen.getByText(/Start Your Journey/i)).toBeInTheDocument();
    expect(screen.getByText(/Explore as Guest/i)).toBeInTheDocument();
    
    // Check if dashboard button is not present
    expect(screen.queryByText(/Go to Dashboard/i)).not.toBeInTheDocument();
  });
  
  it('renders dashboard button when user is logged in', () => {
    // Mock user logged in
    authService.getCurrentUser.mockReturnValue({ token: 'fake-token' });
    
    render(<Hero />);
    
    // Check if dashboard button is present
    expect(screen.getByText(/Go to Dashboard/i)).toBeInTheDocument();
    
    // Check if other buttons are not present
    expect(screen.queryByText(/Start Your Journey/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Explore as Guest/i)).not.toBeInTheDocument();
  });
  
  it('renders the Earth animation component', () => {
    // Mock user not logged in
    authService.getCurrentUser.mockReturnValue(null);
    
    render(<Hero />);
    
    // Check if the Earth animation is rendered
    expect(screen.getByTestId('earth-animation')).toBeInTheDocument();
  });
}); 