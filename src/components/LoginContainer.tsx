// components/LoginContainer.tsx
import React, { useState } from 'react';
import InputField from './InputField'; // Import du composant InputField
import { LoginFormProps } from '../types/logintype'; // Import des types
import { login } from '../services/authService'; // Import de la fonction de service
import { Link } from 'react-router-dom';

interface LoginContainerProps {
  onLoginSuccess: () => void; // Prop appelée après une connexion réussie
}

function LoginContainer({ onLoginSuccess }: LoginContainerProps) {
  const [formData, setFormData] = useState<LoginFormProps>({
    cin_medecin: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData); // Appel au backend via le service
      console.log('Authentification réussie:', response);
      onLoginSuccess(); // Redirige vers la page Home ou autre
    } catch (error) {
      console.error('Échec de l\'authentification:', error);
      alert('Identifiants incorrects.');
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 p-8 rounded-lg shadow-lg">
      {/* Titre du formulaire */}
      <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-red-900">
        Sign in to your account
      </h2>

      {/* Formulaire de connexion */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        {/* Champ CIN Médecin */}
        <InputField
          label="CIN de médecin"
          type="text"
          name="cin_medecin"
          value={formData.cin_medecin}
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
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export default LoginContainer;