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
import EspacePatient from './pages/EspacePatient';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to the home page */}
        <Route path="/" element={<Navigate to="/Acceuil" />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the register Patient page */}
        <Route path="/registerpat" element={<RegisterPat />} />

        {/* Route for the register page */}
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Route for the forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Register />} />
        
        <Route path='/sp' element={<SpecialtySelector />}/>
        
        {/* Route pour la salle d'attente */}
        <Route path="/salle-attente" element={<SalleAttente />} />

        <Route path='/Acceuil' element={<Accueil />}/>
        
        {/* Liste des medecins de chaque specialites */}
        <Route path="/liste-medecins" element={<ListeMedecins />} />

        {/* Route pour l'inscription des secrétaires */}
        <Route path="/register-secretaire" element={<RegisterSecretaire />} />

        {/* Dossier Medical */}
        <Route path="/dossier" element={<DossierMedicale />} />

         {/* Routes pour l'Espace Patient */}
         <Route path="/espace-patient" element={<EspacePatient />}>
          <Route index element={<EspacePatient />} />
          <Route path="dossier" element={<EspacePatient />} />
          <Route path="documents" element={<EspacePatient />} />
          <Route path="chatbot" element={<EspacePatient />} />
          <Route path="settings" element={<EspacePatient />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;