import axios from 'axios';
import { serverUrl } from './urls.config';
import { REFRESH_TOKEN, USER_TOKEN } from '@rang/shared/common-react-models';

export const axiosInstance = axios.create({
  baseURL: `${serverUrl}/api`,
});

// add token in request interceptor axios
axiosInstance.interceptors.request.use((config) => {
  config.headers = {
    Authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;
    if (
      error.response.status === 401 &&
      originalConfig.url !== '/auth/login' &&
      originalConfig.url !== '/auth/update-access-token'
    ) {
      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken !== undefined) {
          const rs = await axiosInstance.post('/auth/update-access-token', {
            refreshToken: refreshToken,
          });
          localStorage.setItem(USER_TOKEN, rs.data.token);
          localStorage.setItem(REFRESH_TOKEN, rs.data.refreshToken);
          return axiosInstance(originalConfig);
        }
      } catch (err) {
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(USER_TOKEN);
      }
    }
    return Promise.reject(error);
  }
);
