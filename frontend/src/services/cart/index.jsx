import { get, put } from '../../utils/request';

export const getCartItems = async () => {
  const response = await get(`/cart`);
  return response;
};

export const addProductToCart = async (productId) => {
  const response = await get(`/cart/add-product/${productId}`);
  return response;
};

export const updateCart = async(cartItems) => {
  const response = await put(`/cart`, cartItems);
  return response;
}
