import { get } from '../../utils/request'

export const getAllCollections = async () => {
  const response = await get('/collections')
  return response
}
