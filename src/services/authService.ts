// services/authService.ts
import axios from 'axios';

// Interface pour les données de connexion
export interface LoginFormProps {
  cin_medecin: string;
  password: string;
}

// Fonction pour se connecter
export const authlogin = async (credentials: LoginFormProps): Promise<void> => {
  try {
    const response = await axios.post('/api/login', credentials); // Remplacez '/api/login' par l'URL de votre backend
    console.log('Réponse du backend:', response.data);
    if (response.status === 200) {
      // Vous pouvez stocker le token ou d'autres données ici
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error; // Répercute l'erreur pour qu'elle soit gérée dans le composant parent
  }
};