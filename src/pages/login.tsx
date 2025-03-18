import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginContainer from '../components/login/LoginContainer';




function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    console.log('Login successful!',);
    navigate('/home');
  };

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center text-white"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(0, 44, 79, 0.7), rgba(0, 102, 128, 0.7)), url(https://www.shutterstock.com/image-photo/green-medical-background-nurse-stethoscope-260nw-338695505.jpg)',
        minHeight: '100vh', // La zone s'étend sur toute la hauteur de la fenêtre
      }}
    >
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="relative w-full max-w-4xl h-[480px] bg-white bg-opacity-60 backdrop-blur-lg rounded-lg shadow-lg flex overflow-hidden">
          
          {/* Left side login form, now shifted to the right */}
          <div className="w-1/2 p-12 bg-gray-200 flex flex-col items-center justify-center relative z-10 ml-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Connexion</h2>


            <LoginContainer onLoginSuccess={handleLoginSuccess} />

            
            <p className="mt-4 text-sm text-gray-700 text-center">
              Mot de passe oublié ?{' '}
              <a href="#" className="text-red-600 hover:text-red-700">Cliquez ici</a>
            </p>
          </div>

          {/* Right side sign up section */}
          <div className="w-1/2 p-12 bg-gradient-to-r from-red-400 to-red-600 text-white flex flex-col items-center justify-center relative">
            <h1 className="text-5xl font-extrabold mb-6">
              Welcome to <span className="text-gray-200">MedPlat</span>
            </h1>
            <p className="text-lg mb-6 text-center">
              Inscrivez-vous et commencez à gérer vos rendez-vous médicaux en toute simplicité.
            </p>
            <Link
              to="/register"
              className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  );
}

export default Login;
