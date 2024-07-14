import { get, patch } from '../../utils/request';

export const getUser = async (id) => {
  const result = await get(`/users/${id}`);
  return result;
};

export const updateUser = async (options) => {
  const result = await patch(`/users`, options);
  console.log(result);
  return result;
};
