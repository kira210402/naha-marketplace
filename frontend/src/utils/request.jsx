import axiosInstance from '../api/axiosConfig';

export const get = async (path) => {
  try {
    const response = await axiosInstance.get(path);
    return response.data;
  } catch (error) {
    console.error('Error during axios get:', error);
    throw error;
  }
};

export const post = async (path, options) => {
  try {
    const response = await axiosInstance.post(path, options, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during axios post:', error);
    throw error;
  }
};

export const del = async (path) => {
  try {
    const response = await axiosInstance.delete(path);
    return response.data;
  } catch (error) {
    console.error('Error during axios delete:', error);
    throw error;
  }
};

export const getUserByToken = async (path, token) => {
  try {
    const response = await axiosInstance.get(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during axios get user by token:', error);
    throw error;
  }
};
