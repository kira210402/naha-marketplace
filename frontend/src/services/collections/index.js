import { del, get, post, put } from '../../utils/request'

export const getAllCollections = async () => {
  const response = await get('/collections')
  return response
}

export const getCollectionById = async (id) => {
  const response = await get(`/collections/${id}`)
  return response
}

export const createCollection = async (newCollection) => {
  const response = await post('/collections', newCollection)
  return response
}

export const updateCollection = async (id, updatedCollection) => {
  const response = await put(`/collections/${id}`, updatedCollection)
  return response
}

export const deleteCollection = async (id) => {
  const response = await del(`/collections/${id}`)
  return response
}

export const removeProduct = async (collectionId, productId) => {
  const response = await del(`/collections/${collectionId}/remove-product/${productId}`)
  return response
}