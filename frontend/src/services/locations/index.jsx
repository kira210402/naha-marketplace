import { get } from '../../utils/request';

const apiUrl =
  'https://vietnam-administrative-division-json-server-swart.vercel.app';

export const getDistrict = async (idProvince) => {
  const result = await get(`${apiUrl}/district/?idProvince=${idProvince}`);
  console.log('result', result);
  return result;
};

export const getCommune = async (idDistrict) => {
  const result = await get(`${apiUrl}/commune/?idDistrict=${idDistrict}`);
  return result;
};
