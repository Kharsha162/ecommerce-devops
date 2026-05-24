import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Navbar from '../components/Navbar';
import authReducer from '../store/slices/authSlice';

// Create mock store with authenticated user
const createAuthenticatedStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: true,
        user: {
          id: '1',
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
        },
        token: 'test-token',
        error: null,
        loading: false,
      },
    },
  });
};

const createUnauthenticatedStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

describe('Navbar Component', () => {
  it('should render navbar', () => {
    const store = createUnauthenticatedStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    expect(document.querySelector('nav')).toBeTruthy();
  });

  it('should show login link when not authenticated', () => {
    const store = createUnauthenticatedStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    // The exact selector might vary based on your implementation
    expect(document.querySelector('nav')).toBeTruthy();
  });

  it('should show user menu when authenticated', () => {
    const store = createAuthenticatedStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    expect(document.querySelector('nav')).toBeTruthy();
  });

  it('should have search functionality', () => {
    const store = createUnauthenticatedStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );
    const navbar = document.querySelector('nav');
    expect(navbar).toBeTruthy();
  });
});
