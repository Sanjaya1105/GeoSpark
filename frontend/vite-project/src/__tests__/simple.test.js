import { describe, it, expect } from 'vitest';

describe('Simple Test', () => {
  it('adds two numbers correctly', () => {
    expect(1 + 1).toBe(2);
  });
  
  it('string concatenation works', () => {
    expect('hello' + ' world').toBe('hello world');
  });
}); 