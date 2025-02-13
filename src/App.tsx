// App.tsx
import React from 'react';


// Importez vos composants
import Register from './pages/Register'; // Page d'inscription médecin
import Login from './pages/login'; // Page de connexion (page initiale)
import RegisterPat from './pages/registerpat'; // Page d'inscription patient
import ForgotPassword from './pages/forgotPassword'; // Page de récupération de mot de passe
import Home from './pages/home';

function App() {
  return (
   <Register/>
  );
}

export default App;