import { createSlice } from '@reduxjs/toolkit';
import { storage } from '../../utils/storage';

const initialState = {
  items: storage.getWishlist(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        storage.setWishlist(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      storage.setWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      storage.removeWishlist();
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
