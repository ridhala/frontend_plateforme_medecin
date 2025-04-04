import axios from 'axios';

const API_URL = 'http://localhost:3000/authmedecin/verifmedecin/'; 

interface VerifyAccountResponse {
  message: string;
}

interface VerifyAccountParams {
  user: string;
  activationcode: string;
}

const verifyAccount = async ({ user, activationcode }: VerifyAccountParams): Promise<VerifyAccountResponse> => {
  try {
    const response = await axios.post<VerifyAccountResponse>(`${API_URL}/:${activationcode}`, {
      user,
      activationcode,
    });
    return response.data; 
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Erreur lors de la vérification du compte.'
      );
    } else {
      throw new Error('Une erreur inconnue est survenue.');
    }
  }
};

export default verifyAccount;