import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: false,
  error: null,
  currentProduct: null,
  categories: [],
  filters: {
    search: '',
    category: '',
    page: 1,
    limit: 12,
  },
  pagination: {},
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload;
      state.loading = false;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProducts,
  setCurrentProduct,
  setCategories,
  setFilters,
  setError,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;
