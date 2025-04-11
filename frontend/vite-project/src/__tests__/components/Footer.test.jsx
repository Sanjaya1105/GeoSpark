import React from 'react';
import { render, screen } from '../utils/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  it('renders footer with company name', () => {
    render(<Footer />);
    expect(screen.getByText('GeoSpark')).toBeInTheDocument();
  });

  it('renders quick links section', () => {
    render(<Footer />);
    
    // Check if the Quick Links section is present
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    
    // Check if all the links are present
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    
    // Check if the Contact Us section is present
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
    
    // Check if contact details are present
    expect(screen.getByText(/Email: info@geospark.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: \+1 \(555\) 123-4567/i)).toBeInTheDocument();
    expect(screen.getByText(/Address: 123 Global Street/i)).toBeInTheDocument();
  });

  it('shows current year in copyright notice', () => {
    // Mock the Date constructor to return a fixed date
    const mockDate = new Date('2024-01-01');
    vi.spyOn(global, 'Date').mockImplementation(() => mockDate);
    
    render(<Footer />);
    
    // Check if the copyright notice contains the current year
    expect(screen.getByText(/© 2024 GeoSpark/i)).toBeInTheDocument();
    
    // Restore the original Date implementation
    vi.restoreAllMocks();
  });
}); 