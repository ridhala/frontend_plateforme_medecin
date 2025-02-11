// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importez vos composants
import Register from './pages/register';
import Login from './pages/login';
import RegisterPat from './pages/registerpat';
import ForgotPassword from './pages/forgotPassword';

function App() {
  return (
    <Router>
      {/* Conteneur principal pour les routes */}
      <Routes>
        

        <Route path="/login" element={<Login />} />
        
        {/* Redirection vers /login si l'URL n'est pas spécifiée */}
        <Route path="/login" element={<Navigate to="/login" />} />

        {/* Route pour la page d'inscription médecin */}
        <Route path="/register" element={<Register />} />

        {/* Route pour la page d'inscription patient */}
        <Route path="/register-patient" element={<RegisterPat />} />

        

        {/* Route pour la page de récupération de mot de passe */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Route par défaut (redirige vers la page de connexion) */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;