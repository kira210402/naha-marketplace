import { get, post } from '../../utils/request';

export const getCartItems = async () => {
  const response = await get(`/cart`);
  return response;
};

export const addProductToCart = async (productId, productItem) => {
  const response = await post(`/cart/add-product/${productId}`, productItem);
  return response;
};
