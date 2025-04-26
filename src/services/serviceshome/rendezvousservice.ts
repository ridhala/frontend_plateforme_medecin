import axios from "axios"
import { Appointments, RendezvousUpdateData } from "../../types/rendezvoustype";
export const getrendezvous =async ()=>{
try{

    const response= await axios.get("http://localhost:3000/rendezvous", {
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
// affichage de date selon le date 
export const getrendezvousbydate =async (date :Date| string)=>{
  try{
  
      const response= await axios.get(`http://localhost:3000/rendezvous/date/:${date}`, {
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
  



// ajouter rendez-vous "http://localhost:3000/rendezvous/update/:id"
export const postrendezvous = async (credentials:Appointments)=>{
  try{

    const response = await axios.post("http://localhost:3000/rendezvous",credentials,{
      headers: {
        Authorization:`bearer ${localStorage.getItem('accessToken')}`        
      }

    } )
    
  return response.data
  }

  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de chargement de données.'
      );
    } else {
      throw new Error('Une erreur inconnue est survenue.');
    }
  }}




export const updateRendezvous = async (_id: string, updateData: RendezvousUpdateData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/rendezvous/update/${_id}`, // Adjust endpoint if different
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