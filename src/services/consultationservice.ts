import axios from "axios";

export const getconsultation = async()=>{
    try {
        const response = await axios.get('http://localhost:3000/consultation/', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        response.data.utilisateur;
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