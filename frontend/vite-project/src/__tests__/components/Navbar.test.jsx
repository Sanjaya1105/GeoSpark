import React from 'react';
import { render, screen } from '../utils/test-utils';
import Navbar from '../../components/Navbar';
import authService from '../../services/authService';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock the auth service
vi.mock('../../services/authService', () => ({
  default: {
    getCurrentUser: vi.fn(),
    logout: vi.fn()
  }
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders navbar with logo', () => {
    render(<Navbar />);
    
    // Check if logo is displayed
    expect(screen.getByAltText(/GeoSpark/i)).toBeInTheDocument();
  });
}); 