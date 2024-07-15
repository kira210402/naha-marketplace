import { del, get, post, put } from '../../utils/request'

export const getStore = async (id) => {
  const result = await get(`/stores/${id}`)
  return result
}

export const getProductsOfStore = async (id) => {
  const results = await get(`/products/store/${id}`)
  return results
}

export const getMyStores = async () => {
  const response = await get(`/stores/my`);
  return response
}

export const createNewStore = async (newStore) => {
  const response = await post('/stores', newStore)
  return response
}

export const updateStore = async (id, updatedStore) => {
  const response = await put(`/stores/${id}`, updatedStore)
  return response
}

export const deleteStore = async (id) => {
  const response = await del(`/stores/${id}`)
  return response
}
