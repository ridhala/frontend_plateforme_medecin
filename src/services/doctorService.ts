import axios from './axiosConfig';
import { DoctorFormData } from '../types/doctorregistertype';
export const registerDoctor = async (data: DoctorFormData) => {
  const formData = new FormData();

  // Ajouter chaque champ à FormData
  formData.append('CIN_medecin', data.CIN_medecin);
  formData.append('nom', data.nom);
  formData.append('prenom', data.prenom);
  formData.append('numero_licence', data.numero_licence);
  formData.append('specialite', data.specialite);
  formData.append('email', data.email);
  formData.append('telephone_personnel', data.telephone_personnel);
  formData.append('adresse_cabinet', data.adresse_cabinet);
  formData.append('telephone_cabinet', data.telephone_cabinet);
  formData.append('password', data.password);

  // Ajouter la photo de profil si elle existe

  try {
    const response = await axios.post('http://localhost:3000/authmedecin/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
