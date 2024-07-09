import { get } from '../../utils/request';

export const getUser = async (id) => {
  const result = await get(`/users/${id}`);
  return result;
};
