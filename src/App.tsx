// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importez vos composants
import Register from './authentfication/register';
import Login from './authentfication/login';
import RegisterPat from './authentfication/registerpat';
import Home from './pages/Home';
import ForgotPassword from './authentfication/forgotPassword';

function App() {
  return (
    <Router>
      {/* Conteneur principal pour les routes */}
      <Routes>
        {/* Route pour la page de connexion (page initiale) */}
        <Route path="/login" element={<Login />} />
        
        {/* Redirection vers /login si l'URL n'est pas spécifiée */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Route pour la page d'inscription médecin */}
        <Route path="/register" element={<Register />} />

        {/* Route pour la page d'inscription patient */}
        <Route path="/register-patient" element={<RegisterPat />} />

        {/* Route pour le tableau de bord (Home) */}
        <Route path="/home" element={<Home />} />

        {/* Route pour la page de récupération de mot de passe */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Route par défaut (redirige vers la page de connexion) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;