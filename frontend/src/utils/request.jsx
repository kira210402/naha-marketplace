import axiosInstance from '../api/axiosConfig';

export const get = async (path) => {
  try {
    const response = await axiosInstance.get(path);
    return response.data;
  } catch (error) {
    console.error('Error during axios get:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const post = async (path, options) => {
  try {
    const response = await axiosInstance.post(path, options, {
      headers: {
        Accept: '*/*',
        'Content-type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during axios post:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      return error.response.data;
    } else if (error.request) {
      console.error('Error request:', error.request);
      return error.request;
    } else {
      console.error('Error message:', error.message);
      return error.message;
    }
  }
};

export const put = async (path, options) => {
  try {
    const response = await axiosInstance.put(path, options, {
      headers: {
        // Accept: '*',
        'Content-type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during axios put:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const patch = async (path, options) => {
  try {
    const response = await axiosInstance.patch(path, options, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during axios patch:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const del = async (path) => {
  try {
    const response = await axiosInstance.delete(path);
    return response.data;
  } catch (error) {
    console.error('Error during axios delete:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};
