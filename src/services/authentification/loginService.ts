// loginService.ts
import axios from 'axios';
import Cookies from 'js-cookie'; 
import { LoginForm, LoginFormadmin } from '../../types/logintype';

export const login = async (credentials:  LoginForm) => {
  try {
    const response = await axios.post('https://backend-plateforme-medecin.fly.dev/loginuser/login', credentials,{
      withCredentials: true, // Pour envoyer les cookies
      headers: {
        'Content-Type': 'application/json',
      }

    });
    
   Cookies.set('accessToken', response.data.accessToken, {
    expires: 7, // 7 jours
    
  });
  
  Cookies.set('refreshToken', response.data.refreshToken, {
    expires: 30, // 30 jours
    
  });
  
  return response.data;
  }catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Échec de la connexion');
    }
    throw new Error('Erreur inconnue');
  }
};

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const logout = () => {
  
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken")

};


export const loginadmin = async (credentials:  LoginFormadmin) => {
  try {
    const response = await axios.post('http://localhost:3000/loginuser/loginadmin', credentials,{
      withCredentials: true, // Pour envoyer les cookies
      headers: {
        'Content-Type': 'application/json',
      }

    });
    
   Cookies.set('accessToken', response.data.accessToken, {
    expires: 7, // 7 jours
    
  });
  
  Cookies.set('refreshToken', response.data.refreshToken, {
    expires: 30, // 30 jours
    
  });
  
  return response.data;
  }catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Échec de la connexion');
    }
    throw new Error('Erreur inconnue');
  }
};






