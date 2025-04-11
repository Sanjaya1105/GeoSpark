import React from 'react';
import { render } from '../utils/test-utils';
import { describe, it, expect } from 'vitest';
import EarthAnimation from '../../components/EarthAnimation';

describe('EarthAnimation Component', () => {
  it('renders the earth animation container', () => {
    const { container } = render(<EarthAnimation />);
    
    // Check if the wrapper div exists
    const wrapper = container.querySelector('.earth-animation-wrapper');
    expect(wrapper).toBeInTheDocument();
    
    // Check if the inner container exists
    const earthContainer = container.querySelector('.earth-container');
    expect(earthContainer).toBeInTheDocument();
  });
  
  it('applies the correct CSS classes for animation', () => {
    const { container } = render(<EarthAnimation />);
    
    // Check if classes for animation are correctly applied
    const wrapper = container.querySelector('.earth-animation-wrapper');
    expect(wrapper).toHaveClass('earth-animation-wrapper');
    
    const earthContainer = container.querySelector('.earth-container');
    expect(earthContainer).toHaveClass('earth-container');
  });
}); 