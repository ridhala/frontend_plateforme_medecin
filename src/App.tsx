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
    <Router>
      <Routes>
        {/* Route pour la page d'accueil (page initiale) */}
        <Route path="/" element={<Accueil />} /> {/* La page Accueil est définie comme la page racine */}
        
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* Route pour la page d'inscription médecin */}
        <Route path="/register" element={<Register />} />
        
        {/* Route pour la page de récupération de mot de passe */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Route par défaut (redirige vers la page d'accueil si aucune route n'est spécifiée) */}
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirection vers la page d'accueil */}
      </Routes>
    </Router>
  );
}

export default App;