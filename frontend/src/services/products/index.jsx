import { del, get, patch, post } from '../../utils/request';

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

export const deleteProduct = async (id) => {
  const result = await del(`/products/${id}`);
  return result;
};

export const editProduct = async (id, options) => {
  const result = await patch(`/products/${id}`, options);
  return result;
};

export const topDiscount = async () => {
  const result = await get(`/products/top-discount`);
  return result;
};
