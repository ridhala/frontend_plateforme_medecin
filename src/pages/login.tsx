import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContainer from '../components/login/LoginContainer';
import { Stethoscope } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
const [succes, setsuccess]= useState<string>("");
  const handleLoginSuccess = async(role:string) => {
   if(role==="medecin")
{    setsuccess("medecin");}
   if(role==="patient")
   { setsuccess("patient");}

   if(role==="secretaire")
    { navigate('/home/patients');}

    setTimeout(async() => {
      
      if(role==="medecin")
      {navigate('/home/patients');}

     if(role==="patient"){
      navigate('/espace-patient');
    }
    
    }, ((3000)));
  };
if(succes==="medecin") {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-400 to-gray-100">
      <div className="bg-gray-200 shadow-lg rounded-4xl p-26 flex items-center justify-center space-x-3 animate-fade-in ">
        <div className="bg-blue-100 p-2 rounded-full">
          <Stethoscope className="h-13 w-13 text-blue-600" />
        </div>
        <div>
          <p className="font-bold text-2xl">Bienvenue Docteur</p>
          <p className="text-xl font-semibold text-gray-700">Bon courage pour votre journée</p>
        </div>
      </div>
      </div>
    
  );
}
else if(succes==="patient") {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-teal-400 to-gray-100">
      <div className="bg-gray-200 shadow-lg rounded-4xl p-26 flex items-center justify-center space-x-3 animate-fade-in ">
        <div className="bg-blue-100 p-2 rounded-full">
        </div>
        <div>
          <p className="font-bold text-2xl">Bienvenue a votre plateforme </p>
          <p className="text-xl text-center font-semibold text-gray-700">Reserver votre rendez-vous</p>
        </div>
      </div>
      </div>
    
  );
}
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