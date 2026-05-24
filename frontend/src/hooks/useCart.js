import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from '../store/slices/cartSlice';
import toast from 'react-hot-toast';

/**
 * Custom hook for cart operations
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const add = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart!');
  };

  const remove = (productId) => {
    dispatch(removeFromCart(productId));
    toast.success('Removed from cart');
  };

  const updateQty = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const clear = () => {
    dispatch(clearCart());
    toast.success('Cart cleared');
  };

  return {
    items,
    total,
    itemCount: items.length,
    add,
    remove,
    updateQty,
    clear,
  };
};
