import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  setLoading,
  setProducts,
  setCurrentProduct,
  setCategories,
  setError,
} from '../store/slices/productSlice';
import { productAPI } from '../utils/api';

/**
 * Custom hook for product operations
 */
export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, currentProduct, loading, error, categories, pagination } =
    useSelector((state) => state.products);

  const fetchProducts = async (filters = {}) => {
    dispatch(setLoading(true));
    try {
      const response = await productAPI.getAllProducts(filters);
      dispatch(setProducts(response));
    } catch (err) {
      const message = err.message || 'Failed to fetch products';
      dispatch(setError(message));
      toast.error(message);
    }
  };

  const fetchProductById = async (id) => {
    dispatch(setLoading(true));
    try {
      const response = await productAPI.getProductById(id);
      dispatch(setCurrentProduct(response.data));
    } catch (err) {
      const message = err.message || 'Failed to fetch product';
      dispatch(setError(message));
      toast.error(message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await productAPI.getCategories();
      dispatch(setCategories(response.data));
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  const addReview = async (productId, reviewData) => {
    try {
      const response = await productAPI.addReview(productId, reviewData);
      dispatch(setCurrentProduct(response.data));
      toast.success('Review added successfully!');
      return response;
    } catch (err) {
      toast.error(err.message || 'Failed to add review');
      throw err;
    }
  };

  return {
    products,
    currentProduct,
    loading,
    error,
    categories,
    pagination,
    fetchProducts,
    fetchProductById,
    fetchCategories,
    addReview,
  };
};
