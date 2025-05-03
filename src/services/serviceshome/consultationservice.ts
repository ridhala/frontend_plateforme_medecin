import axios from "axios";
import { Consultation, Consultations } from "../../types/consultationtype";

export const getconsultation = async(credentials: String)=>{
    try {
      const response = await axios.post("http://localhost:3000/consultation/affichage",{credentials}, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });

       return response.data.consultations;
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
export const getstatconsultation =async ()=>{
  try{
  
      const response= await axios.get(`http://localhost:3000/consultation/stat` , {
  withCredentials: true,
  headers:{
      Authorization:`bearer ${localStorage.getItem('accessToken')}`
  }
      })
      return response.data}
      catch(error){
          if (axios.isAxiosError(error)){
              throw new Error(
                error.response?.data?.message || 'Erreur lors de chargement de données.'
              );
            } else {
              throw new Error('Une erreur inconnue est survenue.');
            }
      }
  }



export const postconsultation = async (credentials:Consultations)=>{
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

  export const updateconsultation = async (_id: string | null, updateData: Consultation | null) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/consultation/update/${_id}`, // Adjust endpoint if different
        updateData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating rendezvous:', error);
      throw error;
    }
  };

  export const deleteconsultation = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/consultation/delete/${id}` , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      });
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'probléme de suppression.'
        );
      } else {
        throw new Error('Une erreur inconnue est survenue.');
      }
    }
  };
  