// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importez vos composants
import Accueil from './pages/Accueil'; // Nouvelle page d'accueil (page initiale)
import Login from './pages/login'; // Page de connexion
import Register from './pages/Register'; // Page d'inscription médecin
import ForgotPassword from './pages/forgotPassword'; // Page de récupération de mot de passe

function App() {
  return (
    <Accueil/>
  );
}

export default App;