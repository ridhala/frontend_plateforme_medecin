// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Login from './pages/login'; // Login page
import Register from './pages/register'; // Register page
import ForgotPassword from './pages/forgotPassword'; // Forgot password page
import Accueil from './pages/Accueil';
import RegisterPat from './pages/registerpat';
import Home from './pages/home';
import SpecialtySelector from './pages/specialite';
import SalleAttente from './pages/SalleAttente';
import ListeMedecins from './pages/ListeMedecins';
import RegisterSecretaire from './pages/registerSecritaire';
import DossierMedicale from './pages/DossierMedicale';


function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to the home page */}

        {/* Route for the home page */}
      

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />
        {/* Route for the register Patient page */}
        <Route path="/registerpat" element={<RegisterPat />} />

        {/* Route for the register page */}
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Route for the forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Register />} />
        <Route path='/sp' element={<SpecialtySelector />}/>
        
         {/* Route pour la salle d'attente avec l'ID du médecin */}
         <Route path="/salle-attente" element={<SalleAttente />} />

        <Route path='/Acceuil' element={<Accueil />}/>
        {/* Fallback route for unknown paths (redirects to home) */}
        <Route path="/" element={<Navigate to="/Acceuil" />} />

       {/* Liste des medecins de chaque specialites */}
        <Route path="/liste-medecins" element={<ListeMedecins />} />

         {/* Route pour l'inscription des secrétaires */}
         <Route path="/register-secretaire" element={<RegisterSecretaire />} />

         <Route path="/dossier" element={<DossierMedicale />} />
      </Routes>
    </Router>
    
  );
}

export default App;