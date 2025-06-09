// src/services/userService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/authadmin"; // pas de .env

export const getPatients = async () => {
  const res = await axios.get(`${API_URL}/patients`);
  return res.data;
};

export const  getMedecins = async () => {
  const res = await axios.get(`${API_URL}/medecins`);
  return res.data;
};

export const getSecretaires = async () => {
  const res = await axios.get(`${API_URL}/secretaires`);
  return res.data;
};

// activer compte medecin
export const activerMedecin = async (id:string) => {

    const response = await axios.get(`${API_URL}/active`, {
      params: { id }
    });
    return response.data;
  }

  // desactiver compte medecin

export const desactiverMedecin = async (id: string) => {

    const response = await axios.get(`${API_URL}/desactive`, {
      params: { id }
    });
    return response.data;
 
};