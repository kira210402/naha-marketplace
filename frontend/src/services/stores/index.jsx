import { get, post, put } from '../../utils/request';
import queryString from 'query-string';
export const getStore = async (id) => {
  const result = await get(`/stores/${id}`);
  return result;
};

export const getProductsOfStore = async (options, filter) => {
  const queryParams = queryString.stringify({ ...options, ...filter });
  const results = await get(`/stores/products?${queryParams}`);
  return results;
};

export const getMyStore = async () => {
  const response = await get(`/stores/my`);
  return response;
};

export const createNewStore = async (newStore) => {
  const response = await post('/stores', newStore);
  return response;
};

export const updateStore = async (updatedStore) => {
  const response = await put(`/stores`, updatedStore);
  return response;
};

export const getListOrderFromStore = async () => {
  const result = await get(`/orders/store`);
  return result;
};
