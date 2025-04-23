import axios from "axios";
import { Consultation } from "../../types/consultationtype";

export const getconsultation = async()=>{
    try {
        const response = await axios.get('http://localhost:3000/consultation/', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

       return response.data;
      }
      catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            error.response?.data?.message || 'Erreur lors de chargement de données.'
          );
        } else {
          throw new Error('Une erreur inconnue est survenue.');
        }
      }
}
export const postconsultation = async (credentials:Consultation)=>{
  try{

    const response = await axios.post("http://localhost:3000/consultation",credentials,{
      headers: {
        Authorization:`bearer ${localStorage.getItem('accessToken')}`        
      }
    } )
    
  return response.data
  }

  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de chargement de données de consultation.'
      );
    } else {
      throw new Error('Une erreur inconnue est survenue.');
    }
  }}