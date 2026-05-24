import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

const initialState = {
  items: storage.getCart(),
  total: 0,
};

// Calculate total price
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }

      state.total = calculateTotal(state.items);
      storage.setCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.total = calculateTotal(state.items);
      storage.setCart(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
      state.total = calculateTotal(state.items);
      storage.setCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      storage.removeCart();
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
