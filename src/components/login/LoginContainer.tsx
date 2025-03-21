// components/LoginContainer.tsx
import React, { useState } from 'react';
import InputField from '././InputField'; // Import du composant InputField
import { LoginForm} from '../../types/logintype'; // Import des types
import { Link } from 'react-router-dom';
import { login } from '../../services/loginService'
interface LoginContainerProps {
  onLoginSuccess: () => void; // Prop appelée après une connexion réussie
}

function LoginContainer({ onLoginSuccess }: LoginContainerProps) {
  const [formData, setFormData] = useState<LoginForm>({
    cin: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData); 
      console.log('Authentification réussie:', response);

      // Stocker les tokens dans le localStorage
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      onLoginSuccess();
    } catch (error) {

      if (error instanceof Error) {
        setErrorMessage(`Échec de l'authentification: ${error.message}`);
      } else {
        setErrorMessage('Une erreur inconnue est survenue lors de la connexion.');
      }
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 p-8 rounded-lg shadow-lg">
        {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}
      {/* Titre du formulaire */}
      <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-red-900">
        Sign in to your account
      </h2>

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Champ CIN Médecin */}
        <InputField
          label="cin"
          type="text"
          name="cin"
          value={formData.cin}
          onChange={handleChange}
          required
        />

        {/* Champ Mot de passe */}
        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Lien "Mot de passe oublié ?" */}
        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>

        {/* Bouton de soumission */}
        <button
  type="submit"
  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
>
  Sign in
</button>

      </form>
    </div>
  );
}

export default LoginContainer;