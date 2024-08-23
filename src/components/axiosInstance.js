import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const useAxiosInstance = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
  
    // Create and configure the Axios instance
    const getAxiosInstance = useCallback(() => {
      const axiosInstance = axios.create({
        baseURL: 'https://testnet.jamfortetech.com',
      });
  
      // Request interceptor to add token to headers
      axiosInstance.interceptors.request.use(
        config => {
          if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
          }
          return config;
        },
        error => Promise.reject(error)
      );
  
      // Response interceptor to handle token expiration
      axiosInstance.interceptors.response.use(
        response => response,
        error => {
          if (error.response && error.response.status === 401) {
            // Token expired or unauthorized
            logout();
            navigate('/'); // Redirect to login page or appropriate route
          }
          return Promise.reject(error);
        }
      );
  
      return axiosInstance;
    }, [user, logout, navigate]);
  
    return getAxiosInstance;
};

export default useAxiosInstance;