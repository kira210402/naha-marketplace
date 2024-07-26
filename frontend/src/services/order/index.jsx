import { get, post } from '../../utils/request';

export const createOrder = async (options) => {
  const result = await post(`/orders`, options);
  return result;
};

export const getListOrderByUserId = async () => {
  const result = await get(`/orders/history`);
  return result;
};
