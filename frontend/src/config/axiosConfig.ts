import { store } from '@/stores/store';
import { logout, refresh } from '@/stores/userReducer';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';
import { redirect } from 'react-router-dom';

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const publicAxios: AxiosInstance = axios.create({
  baseURL,
});

const privateAxios: AxiosInstance = axios.create({
  baseURL,
});

privateAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = store.getState()?.user?.auth?.accessToken;
    if (accessToken) {
      const newConfig = Object.assign({}, config, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ...config.headers,
        },
      });
      config.headers = newConfig.headers;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState()?.user?.auth?.refreshToken;
      if (refreshToken) {
        //refresh token and then refecth the original request
        try {
          const { data } = await privateAxios.post('/auth/refresh', {
            refreshToken: refreshToken,
          });

          store.dispatch(refresh(data.data.accessToken));
          privateAxios.defaults.headers[
            'Authorization'
          ] = `Bearer ${data.data.accessToken}`;
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${data.data.accessToken}`;
          console.log({ originalRequest });
          return privateAxios(originalRequest);
        } catch (refreshError) {
          toast.error('Refresh token expired please login again');

          store.dispatch(logout());
          redirect('/login');
        }
      } else {
        toast.error('Refresh tken Not found please login again');
        redirect('/login');
        store.dispatch(logout());
      }
    }
    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
