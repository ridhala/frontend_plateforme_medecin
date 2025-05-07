import axios from "axios"
import { addpatient, Patient } from "../../types/patienttype";

export const fetchpatient= async()=>{
try{
  const response=  await axios.get("http://localhost:3000/authpatient/", {
withCredentials: true,

headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
  }
    });
    return response.data.listpatients
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
export const ajoutpatient = async (credentials: addpatient)=> {
    try {
      const response = await axios.post('http://localhost:3000/authpatient/ajoutpatient', credentials,{
        headers: {
          Authorization:`bearer ${localStorage.getItem('accessToken')}`        
        }
      }  );
      console.log(response.data)

      return response.data;
    }
    
    catch (error) {
      throw new Error(`probleme de connexion lors de création patient}`);
    }}
 
    export const statistiquepatients= async()=> {
try{

  const response = await axios.get("http://localhost:3000/authpatient/statpatient", {
    withCredentials:true,
    headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
  })
  return response.data
}

catch (error) {
  if (axios.isAxiosError(error)) {
    throw new Error(
      error.response?.data?.message || 'probleme de connexion lors de chargement de données.'
    );
  } else {
    throw new Error('Probleme de connexion.');
  }
}    }