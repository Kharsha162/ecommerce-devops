/**
 * Local Storage utility functions
 */

export const storage = {
  setToken: (token) => localStorage.setItem('authToken', token),
  getToken: () => localStorage.getItem('authToken'),
  removeToken: () => localStorage.removeItem('authToken'),

  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  removeUser: () => localStorage.removeItem('user'),

  setCart: (cart) => localStorage.setItem('cart', JSON.stringify(cart)),
  getCart: () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  },
  removeCart: () => localStorage.removeItem('cart'),

  setWishlist: (wishlist) => localStorage.setItem('wishlist', JSON.stringify(wishlist)),
  getWishlist: () => {
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  },
  removeWishlist: () => localStorage.removeItem('wishlist'),
};

export const clearAllStorage = () => {
  localStorage.clear();
};
