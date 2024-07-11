import { get } from '../../utils/request';

export const getCartItems = async () => {
  console.log('ok')
  const response = await get(`/cart`);
  return response;
};

export const addProductToCart = async (productId) => {
  const response = await get(`/cart/add-product/${productId}`);
  return response;
};
