import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

// API configuration
export const API_BASE_URL = 'http://localhost:3000/api/v1/';

//todo: temp workaround until auth and all env implemented
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN || '';

// Debug log
console.log('Environment variables:', {
  AUTH_TOKEN,
  HAS_TOKEN: !!AUTH_TOKEN,
  ENV_VARS: import.meta.env,
});

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Add auth token if available
if (AUTH_TOKEN) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // You can add request logging here
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    //todo:response logging here
    return response;
  },
  (error: AxiosError) => {
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout'));
    }

    if (!error.response) {
      return Promise.reject(new Error('Network error'));
    }

    // Handle specific status codes
    switch (error.response.status) {
      case 401:
        // Handle unauthorized
        return Promise.reject(new Error('Unauthorized'));
      case 403:
        return Promise.reject(new Error('Forbidden'));
      case 404:
        return Promise.reject(new Error('Not found'));
      case 500:
        return Promise.reject(new Error('Server error'));
      default:
        return Promise.reject(error);
    }
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
