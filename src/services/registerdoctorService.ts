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
    throw error;
  }
};