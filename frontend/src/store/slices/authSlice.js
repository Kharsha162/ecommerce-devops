import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

const initialState = {
  user: storage.getUser(),
  token: storage.getToken(),
  isAuthenticated: !!storage.getToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      storage.setToken(action.payload.token);
      storage.setUser(action.payload.user);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      storage.setToken(action.payload.token);
      storage.setUser(action.payload.user);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      storage.removeToken();
      storage.removeUser();
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      storage.setUser(state.user);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  loginStart,
  loginSuccess,
  loginFailure,
  registerSuccess,
  logout,
  updateUser,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
