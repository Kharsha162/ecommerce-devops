import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { FiMail, FiLock } from 'react-icons/fi';

/**
 * Login Page
 */
const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  // Redirect if already logged in (removed - login function handles this)

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await login(formData.email, formData.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              EC
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your eCommerce account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            icon={FiMail}
            disabled={loading}
          />

          {/* Password */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            icon={FiLock}
            disabled={loading}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-600"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full mt-6"
            size="lg"
          >
            Sign In
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-600">Don't have an account?</span>
          </div>
        </div>

        {/* Register Link */}
        <Link
          to="/register"
          className="block w-full text-center py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold"
        >
          Create Account
        </Link>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-semibold text-blue-900 mb-2">Demo Credentials:</p>
          <p className="text-blue-800"><strong>Admin:</strong> admin@ecommerce.com / Admin@123</p>
          <p className="text-blue-800"><strong>User:</strong> john@example.com / John@123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
