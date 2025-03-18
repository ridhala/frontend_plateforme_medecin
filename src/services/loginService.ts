import axios from 'axios';
import { LoginForm } from '../types/logintype';
export const login = async (formData: LoginForm) => {

  interface LoginResponse {
    accessToken: string;
    refreshToken: string;
  }
  
  try {
     
    const response = await axios.post<LoginResponse>('http://localhost:3000/loginuser/login', formData, {
    
      
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      if (error.response) {
       
        throw new Error(error.response.data.message || 'An error occurred during login.');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from the server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message);
      }
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};
/*// services/loginService.ts
import axios from 'axios';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const login = async (formData: { cin: string; password: string }) => {
  try {
    const response = await axios.post<LoginResponse>('http://localhost:3000/auth/login', formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}; */