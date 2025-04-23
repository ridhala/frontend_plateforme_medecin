import axios from "axios"
import { MedecinProfile } from "../../types/profilemedecin"
import { profileformData } from "../../types/doctorregistertype"
export const update = async (credentials: profileformData) : Promise<MedecinProfile>=>{
    try{
       const response =await axios.post("http://localhost:3000/update/updateprofile",credentials,{
    withCredentials: true, // Pour envoyer les cookies
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }

  })  
    console.log(response.data.utilisateur)

 return response.data.utilisateur;
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