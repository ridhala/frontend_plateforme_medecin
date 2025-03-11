import axios from 'axios';
import { Patientform } from '../types/patienttype';
export const registerPatient = async (formData: Patientform) => {
  const token = localStorage.getItem('token'); 


  try {
     
    const response = await axios.post('http://localhost:3000/authpatient/register', formData, {
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