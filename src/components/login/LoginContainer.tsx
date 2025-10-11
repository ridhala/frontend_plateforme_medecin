import React, { useState } from 'react';
import InputField from '././InputField';
import { LoginForm } from '../../types/logintype';
import { Link } from 'react-router-dom';
import { login } from '../../services/authentification/loginService';
import { Loader2 } from 'lucide-react';

interface LoginContainerProps {
  onLoginSuccess: (role: string) => void;
}

function LoginContainer({ onLoginSuccess }: LoginContainerProps) {
  const [formData, setFormData] = useState<LoginForm & { honeypot?: string }>({
    cin: '',
    password: '',
    honeypot: '', // 🐝 champ honeypot ajouté
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 🐝 Vérification du champ honeypot côté frontend
    if (formData.honeypot) {
      console.warn('🤖 Honeypot détecté, requête ignorée.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(formData); 
      console.log('Authentification réussie:', response);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      onLoginSuccess(response.role);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(` ${error.message}`);
      } else {
        setErrorMessage('Une erreur inconnue est survenue lors de la connexion.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 p-8 rounded-lg shadow-lg">
      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
          <p>{errorMessage}</p>
        </div>
      )}

      <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-800">
        Connectez-vous à votre compte
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <InputField
          label="Cin"
          type="text"
          name="cin"
          value={formData.cin}
          onChange={handleChange}
          required
        />

        <InputField
          label="Mot de passe"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* 🐝 Honeypot - Champ invisible */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          autoComplete="off"
          tabIndex={-1}
          className="absolute opacity-0 w-0 h-0"
        />

        <div className="text-sm">
          <Link
            to="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Mot de passe oublié
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-md font-semibold text-white bg-blue-700 hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          ) : (
            "Connexion"
          )}
        </button>
      </form>
    </div>
  );
}

export default LoginContainer;
