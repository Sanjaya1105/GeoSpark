import React from 'react';
import { render, screen } from '../utils/test-utils';
import { describe, it, expect } from 'vitest';
import Banner from '../../components/Banner';

describe('Banner Component', () => {
  it('renders banner with correct text content', () => {
    render(<Banner />);
    
    // Check if important elements are rendered
    expect(screen.getByText(/Explore Our World/i)).toBeInTheDocument();
    expect(screen.getByText(/Discover fascinating facts about countries/i)).toBeInTheDocument();
    expect(screen.getByText(/Start Your Journey/i)).toBeInTheDocument();
  });
  
  it('renders banner image', () => {
    render(<Banner />);
    
    const bannerImage = screen.getByAltText(/Earth from space/i);
    expect(bannerImage).toBeInTheDocument();
    expect(bannerImage).toHaveAttribute('src', expect.stringContaining('unsplash.com'));
  });
  
  it('has a functional call-to-action button with correct href', () => {
    render(<Banner />);
    
    const ctaButton = screen.getByText(/Start Your Journey/i);
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('href', '#explore');
  });
}); 