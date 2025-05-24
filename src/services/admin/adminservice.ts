// src/services/userService.ts
import axios from "axios";

const API_URL = "http://localhost:3000/authadmin"; // pas de .env

export const getPatients = async () => {
  const res = await axios.get(`${API_URL}/patients`);
  return res.data;
};

export const getMedecins = async () => {
  const res = await axios.get(`${API_URL}/medecins`);
  return res.data;
};

export const getSecretaires = async () => {
  const res = await axios.get(`${API_URL}/secretaires`);
  return res.data;
};
