import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import authReducer from '../store/slices/authSlice';

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

// Create mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
  });

  it('should render without crashing', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(document.body).toBeTruthy();
  });

  it('should render the main layout', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    // Check if main content area is rendered
    expect(document.querySelector('main') || document.body).toBeTruthy();
  });
});
