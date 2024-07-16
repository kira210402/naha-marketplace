import { get, post } from '../../utils/request';

export const getProduct = async (id) => {
  const result = await get(`/products/${id}`);
  return result;
};

export const getListProduct = async () => {
  const result = await get(`/products`);
  return result;
};

export const getSearchProduct = async (keyword) => {
  const result = await get(`/products/search${keyword}`);
  return result;
};

export const createProduct = async (options) => {
  const result = await post(`/products/create`, options);
  return result;
};
