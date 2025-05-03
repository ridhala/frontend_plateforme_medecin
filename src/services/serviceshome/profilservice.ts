import axios from "axios"
import { MedecinProfile } from "../../types/profilemedecin"
import { profileformData } from "../../types/doctorregistertype"
import { Secretaire } from "../../types/secretairetype"
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

//affichage profil medecin 
export const fetchprofilmedecin= async()=>{
  try{
    const response=  await axios.get("http://localhost:3000/update/profile", {
  withCredentials: true,
  
  headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
      });
      return response.data.utilisateur
  }
  
  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'probleme de connexion lors de chargement de données.'
      );
    } else {
      throw new Error('Probleme de connexion.');
    }
  }
  }
//register compte secretaire 
  export const createsecreteaire = async(form :Secretaire )=>{
    try
  {  const response = await axios.post('http://localhost:3000/authsecretaire/register', form, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    console.log(response.data.newSecretaire)
    return response.data.newSecretaire

  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'probleme de connexion lors de chargement de données.'
      );
    } else {
      throw new Error('Probleme de connexion.');
    }
  }
}

//  affichage de compte secretaire 
export const profilSecretaire = async () => {

  try {
    const response = await axios.get('http://localhost:3000/authsecretaire/comptesecretaire', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    });
    return response.data.profilsecretaire
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'probleme de connexion lors de chargement de données.'
      );
    } else {
      throw new Error('Probleme de connexion.');
    }
  }
};
