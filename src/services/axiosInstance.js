import axios from 'axios';
import {store} from 'store';

const axiosInstance = axios.create({
  baseURL: 'https://beta.geens.com/api',
});

axiosInstance.interceptors.request.use(async (request) => {
  const accessToken = store.getState().backup.accessToken;
  if (accessToken) {
    request.headers.authorization = `Bearer ${accessToken}`;
  }
  return request;
});

export default axiosInstance;
