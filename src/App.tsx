// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />
        {/* Route pour la page d'inscription médecin */}
        <Route path="/register" element={<Register />} />
        {/* Route pour le tableau de bord */}
        <Route path="/home" element={<Home />} />
        {/* Redirection vers /login si aucune route n'est spécifiée */}
        <Route path="/" element={<Navigate to="/register" />} />
        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;