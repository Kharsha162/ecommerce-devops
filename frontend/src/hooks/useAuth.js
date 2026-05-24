import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerSuccess,
  logout,
} from '../store/slices/authSlice';
import { authAPI } from '../utils/api';

/**
 * Custom hook for authentication operations
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = async (email, password) => {
    dispatch(loginStart());
    try {
      const response = await authAPI.login({ email, password });
      dispatch(
        loginSuccess({
          user: response.user,
          token: response.token,
        })
      );
      toast.success('Login successful!');
      navigate(response.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      const message = err.message || 'Login failed';
      dispatch(loginFailure(message));
      toast.error(message);
    }
  };

  const register = async (userData) => {
    dispatch(loginStart());
    try {
      const response = await authAPI.register(userData);
      dispatch(
        registerSuccess({
          user: response.user,
          token: response.token,
        })
      );
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      const message = err.message || 'Registration failed';
      dispatch(loginFailure(message));
      toast.error(message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout: handleLogout,
  };
};
