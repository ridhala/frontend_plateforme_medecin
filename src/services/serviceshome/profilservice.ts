import axios from "axios"
import { MedecinProfile } from "../../types/profilemedecin"
export const update = async (credentials: Partial<MedecinProfile>) : Promise<MedecinProfile>=>{
    try{
       const response =await axios.put("http://localhost:3000/profil/updateprofil",credentials,{
    withCredentials: true, // Pour envoyer les cookies
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
    }

  })
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