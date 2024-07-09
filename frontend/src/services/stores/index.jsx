import { get } from '../../utils/request'

export const getStore = async (id) => {
  const result = await get(`/stores/${id}`)
  return result
}

export const getProductsOfStore = async (id) => {
  const results = await get(`/products/store/${id}`)
  return results
}