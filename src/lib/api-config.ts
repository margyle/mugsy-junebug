import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';

// API configuration
export const API_BASE_URL = import.meta.env.VITE_DECAF_API_BASE_URL;

// Minimal setup - just withCredentials for auth + error handling
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  withCredentials: true, // Better Auth handles session cookies automatically
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Please log in again'));
    }
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Access denied'));
    }
    return Promise.reject(error);
  }
);

// API request methods
export const api = {
  get: <T>(endpoint: string, config?: AxiosRequestConfig) => axiosInstance.get<T>(endpoint, config),

  post: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.post<T>(endpoint, data, config),

  put: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.put<T>(endpoint, data, config),

  patch: <T>(endpoint: string, data?: unknown, config?: AxiosRequestConfig) =>
    axiosInstance.patch<T>(endpoint, data, config),

  delete: <T>(endpoint: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<T>(endpoint, config),
};
