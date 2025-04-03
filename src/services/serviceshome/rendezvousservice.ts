import axios from "axios"

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