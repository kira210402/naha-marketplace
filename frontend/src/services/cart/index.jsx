import { get, post, put } from '../../utils/request';

export const getCartItems = async () => {
  const response = await get(`/cart`);
  return response;
};

export const addProductToCart = async (productId, quantity) => {
  const response = await post(
    `/cart/add-product/${productId}?quantity=${quantity}`,
  );
  return response;
};

export const updateCart = async (cartItems) => {
  const response = await put(`/cart`, cartItems);
  return response;
};
