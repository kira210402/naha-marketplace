import { get } from '../../utils/request';

export const getProduct = async (id) => {
  const result = await get(`/products/${id}`);
  return result;
};

export const getListProduct = async () => {
  const result = await get(`/products`);
  return result;
};
