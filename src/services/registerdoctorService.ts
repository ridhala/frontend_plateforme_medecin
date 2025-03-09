import axios from 'axios';
import { DoctorFormData } from '../types/doctorregistertype';
export const registerDoctor = async (formData: FormData) => {
  const token = localStorage.getItem('token'); 

  // Ajouter chaque champ à FormData
  

  // Ajouter la photo de profil si elle existe

  try {
     
    const response = await axios.post('http://localhost:3000/authmedecin/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, 
        
      }
      
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific error
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.message || 'An error occurred during registration.');
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