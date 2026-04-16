import { apiClient } from "./apiClient";
export { tokenStorage } from "./tokenStorage";


export const apiGet = async (url, options = {}) => {
  try {
    const response = await apiClient.get(url, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPost = async (url, data = {}, options = {}) => {
  try {
    const response = await apiClient.post(url, data, options);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiPut = async (url, data = {}, options = {}) => {
  try {
    const response = await apiClient.put(url, data, options);
    return response.data; 
  } catch (error) {
    throw error;
  }
};  

export const apiDelete = async (url, options = {}) => {
  try {
    const response = await apiClient.delete(url, options);
    return response.data;
  } catch (error) {
    throw error;
  }
};