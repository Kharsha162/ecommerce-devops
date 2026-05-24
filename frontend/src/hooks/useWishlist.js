import { useDispatch, useSelector } from 'react-redux';
import {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from '../store/slices/wishlistSlice';
import toast from 'react-hot-toast';

/**
 * Custom hook for wishlist operations
 */
export const useWishlist = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  const add = (product) => {
    dispatch(addToWishlist(product));
    toast.success('Added to wishlist!');
  };

  const remove = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.success('Removed from wishlist');
  };

  const clear = () => {
    dispatch(clearWishlist());
  };

  const isInWishlist = (productId) => {
    return items.some((item) => item.id === productId);
  };

  return {
    items,
    itemCount: items.length,
    add,
    remove,
    clear,
    isInWishlist,
  };
};
