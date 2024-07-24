import { post } from '../../utils/request';

export const createOrder = async (options) => {
  const result = await post(`/orders`, options);
  console.log('options', options);
  return result;
};
