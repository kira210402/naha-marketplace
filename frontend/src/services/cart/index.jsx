import { get } from '../../utils/request'

export const getCartItems = async (id) => {
  const response = await get(`/cart/${id}`)
  return response
}