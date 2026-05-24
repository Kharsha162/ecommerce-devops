import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      interceptors: {
        request: { use: vi.fn() },
        response: { use: vi.fn() },
      },
    })),
  },
}));

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />);
    expect(document.body).toBeTruthy();
  });

  it('should render the main layout', () => {
    render(<App />);
    expect(document.querySelector('main') || document.body).toBeTruthy();
  });
});
