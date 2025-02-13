// pages/Login.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importez useNavigate pour la redirection
import LoginContainer from '../components/LoginContainer'; // Import du composant LoginContainer

function Login() {
  const navigate = useNavigate(); // Hook pour naviguer entre les pages

  // Fonction appelée après une connexion réussie
  const handleLoginSuccess = () => {
    console.log('Login successful!');
    navigate('/home'); // Redirige vers la page Home après une connexion réussie
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/020/679/215/non_2x/technology-medical-background-medical-icons-modern-wallpaper-geometric-hexagon-vector.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Conteneur pour le titre */}
      <div className="w-full text-center mb-8">
        <h1
          className="text-5xl md:text-7xl font-bold tracking-wide hover:text-sky-400 transition-colors duration-300 ease-in-out"
          style={{
            color: 'black',
            WebkitTextStroke: '1px black',
          }}
        >
          WELCOME TO MEDPLATFORM
        </h1>
      </div>

      {/* Conteneur principal centré avec LoginContainer */}
      <LoginContainer onLoginSuccess={handleLoginSuccess} />

      {/* Lien d'inscription */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Register now
        </Link>
      </p>
    </div>
  );
}

export default Login;