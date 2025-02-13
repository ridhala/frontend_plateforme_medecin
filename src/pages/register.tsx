// pages/Register.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import RegisterContainer from '../components/register/RegisterContainer'; // Import the RegisterContainer component

function Register() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle successful registration
  const handleRegisterSuccess = () => {
    console.log('Registration successful!');
    navigate('/login'); // Redirect to the login page after successful registration
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* Conteneur principal centré */}
      <RegisterContainer onRegisterSuccess={handleRegisterSuccess} />
    </div>
  );
}

export default Register;