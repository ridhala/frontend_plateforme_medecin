import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginContainer from '../components/login/LoginContainer';

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log('Login successful!');
    navigate('/home');
  };

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center text-white"
      style={{
        backgroundImage:
          ' url(https://static.tildacdn.com/tild6437-3637-4330-a366-616538343966/Depositphotos_163132.jpg)',
        minHeight: '100vh', // La zone s'étend sur toute la hauteur de la fenêtre
      }}
    >
      {/* Conteneur pour centrer le formulaire */}
      <div className="flex items-center justify-center min-h-screen">
        {/* Formulaire de connexion */}
        <div className="w-full max-w-md p-6 bg-white/80 rounded-lg shadow-lg">
          <LoginContainer onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </section>
  );
}

export default Login;