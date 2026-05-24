import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';

/**
 * Register Page
 */
const Register = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const [errors, setErrors] = useState({});

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our eCommerce platform</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            icon={FiUser}
            disabled={loading}
          />

          {/* Email */}
          <Input
            label="Email"
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

          {/* Confirm Password */}
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            icon={FiLock}
            disabled={loading}
          />

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Register as
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            loading={loading}
            disabled={loading}
            className="w-full mt-6"
            size="lg"
          >
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-600">Already have an account?</span>
          </div>
        </div>

        {/* Login Link */}
        <Link
          to="/login"
          className="block w-full text-center py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition font-semibold"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Register;
