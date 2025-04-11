import React from 'react';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import HomePage from '../../components/HomePage';
import authService from '../../services/authService';
import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the auth service
vi.mock('../../services/authService', () => ({
  default: {
    getCurrentUser: vi.fn()
  }
}));

// Mock localstorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('HomePage Component', () => {
  const mockUser = {
    user: {
      _id: 'user123',
      name: 'Test User',
      email: 'test@example.com'
    },
    token: 'fake-token'
  };
  
  const mockCountries = [
    {
      name: { common: 'United States' },
      cca3: 'USA',
      flags: { png: 'us-flag.png' },
      capital: ['Washington D.C.'],
      region: 'Americas',
      population: 329500000
    },
    {
      name: { common: 'Germany' },
      cca3: 'DEU',
      flags: { png: 'germany-flag.png' },
      capital: ['Berlin'],
      region: 'Europe',
      population: 83000000
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock successful fetch
    global.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCountries)
    });
    
    // Mock user is logged in
    authService.getCurrentUser.mockReturnValue(mockUser);
    
    // Mock favorites in localStorage
    localStorageMock.getItem.mockReturnValue(JSON.stringify([
      {
        cca3: 'USA',
        name: 'United States',
        flags: { png: 'us-flag.png' },
        capital: ['Washington D.C.'],
        region: 'Americas',
        population: 329500000
      }
    ]));
  });

  test('allows searching for countries', async () => {
    render(<HomePage />);
    
    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('United States')).toBeInTheDocument();
    });
    
    // Type in search query
    const searchInput = screen.getByPlaceholderText(/Try searching for countries/i);
    await userEvent.type(searchInput, 'Germany');
    
    // Submit search form
    const searchButton = screen.getByRole('button', { name: /Search/i });
    fireEvent.click(searchButton);
    
    // Should show search results heading
    await waitFor(() => {
      expect(screen.getByText(/Search Results for "Germany"/i)).toBeInTheDocument();
    });
    
    // Should filter to only show Germany
    expect(screen.getByText('Germany')).toBeInTheDocument();
    expect(screen.queryByText('United States')).not.toBeInTheDocument();
  });

  test('toggles country as favorite', async () => {
    render(<HomePage />);
    
    // Wait for countries to load
    await waitFor(() => {
      expect(screen.getByText('Germany')).toBeInTheDocument();
    });
    
    // Find the favorite button for Germany (not already favorited)
    const favoriteButtons = screen.getAllByRole('button', { 
      name: '' // Favorite buttons don't have accessible names, this gets all icon buttons
    });
    
    // Click the second favorite button (for Germany)
    fireEvent.click(favoriteButtons[1]);
    
    // Should call localStorage.setItem with updated favorites
    expect(localStorageMock.setItem).toHaveBeenCalled();
    
    // The call should include the user ID
    expect(localStorageMock.setItem.mock.calls[0][0]).toBe('favorites_user123');
    
    // The new favorites should include Germany
    const savedFavorites = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
    expect(savedFavorites.some(fav => fav.cca3 === 'DEU')).toBe(true);
  });

  test('handles API error gracefully', async () => {
    // Mock a fetch error
    global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<HomePage />);
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Error loading countries data/i)).toBeInTheDocument();
    });
  });

  test('scrolls to dashboard when Start Exploring button is clicked', async () => {
    // Mock the scrollIntoView function
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;
    
    render(<HomePage />);
    
    // Find and click the Start Exploring button
    const exploreButton = screen.getByRole('button', { name: /Start Exploring/i });
    fireEvent.click(exploreButton);
    
    // Should call scrollIntoView
    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
}); 