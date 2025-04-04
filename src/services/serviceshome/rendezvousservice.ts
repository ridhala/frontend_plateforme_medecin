import axios from "axios"
import { Appointments } from "../../types/rendezvoustype";
// affichage des rendez-vous
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
// ajouter rendez-vous
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