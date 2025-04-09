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

import Activationpage from './pages/verifemail';
import DoctorDashboard from './components/home/welcome';
import SpecialtySelector from './pages/specialite';
import SalleAttente from './pages/SalleAttente';

////////////////////////////////////////////////////////////////////////////////////////////
function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/login" element={<Login />} />

        <Route path="/registerpat" element={<RegisterPat />} />
<Route path='/verif/:activationcode' element={<Activationpage/>}/>
  
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

       
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Register />} />

        <Route path="welcome" element={<DoctorDashboard />} />

        <Route path='/sp' element={<SpecialtySelector />}/>
        
         {/* Route pour la salle d'attente avec l'ID du médecin */}
         <Route path="/salle-attente" element={<SalleAttente />} />


        <Route path='/Acceuil' element={<Accueil />}/>
        
        <Route path="/" element={<Navigate to="/Acceuil" />} />
      </Routes>
    </Router>
    
  );
}

export default App;