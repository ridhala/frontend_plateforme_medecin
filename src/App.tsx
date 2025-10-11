// App.tsx
import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import Login from './pages/login'; // Login page
import Register from './pages/register'; // Register page
import ForgotPassword from './pages/forgotPassword'; // Forgot password page
import Accueil from './pages/Accueil';
import RegisterPat from './pages/registerpat';
import Home from './pages/home';

import Activationpage from './pages/verifemail';

import SpecialtySelector from './pages/specialite';
import SalleAttente from './components/espacepatient/SalleAttente';



import DashboardContent from './components/home/DashboardContent';
import Sidebar from './components/home/Sidebar';
import AdminDashboard from './pages/dashboardadmin';
import AdminLogin from './pages/loginadmin';

////////////////////////////////////////////////////////////////////////////////////////////

import ListeMedecins from './pages/ListeMedecins';
import RegisterSecretaire from './pages/registerSecritaire';
import DossierMedicale from './pages/DossierMedicale';
import EspacePatient from './pages/EspacePatient';
import { SpecialitesContent } from './components/espacepatient/choixspecialite';
import Chatbot from './components/espacepatient/chatbot';
import { RendezvousTable } from './components/espacepatient/rendezvous';
import ProfilPatient from './components/espacepatient/profilpatient';
import { CertificateGenerator } from './components/espacepatient/certaficat';


function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
 

  return (
    <Router>
      <Routes>

      
        <Route path="/login" element={<Login />} />
      
                {/* Default route redirects to the home page */}
        <Route path="/" element={<Navigate to="/Acceuil" />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the register Patient page */}
        <Route path="/registerpat" element={<RegisterPat />} />


        <Route path="/registerpat" element={<RegisterPat />} />
<Route path='/verif/:activationcode' element={<Activationpage/>}/>
  
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />


      <Route 
        path="/home/:section" 
        element={
          <div className="flex h-screen ">
            <Sidebar 
              setActiveSection={setActiveSection}  />
            <DashboardContent 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>
        } 
      />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Register />} />
        <Route path="/cert" element={<CertificateGenerator />} />

        <Route path="admindashboard" element={<AdminDashboard />} />
                <Route path="loginadmin" element={<AdminLogin />} />

        <Route path='/sp' element={<SpecialtySelector />}/>
        
        {/* Route pour la salle d'attente */}


        <Route path='/Acceuil' element={<Accueil />}/>


        <Route path="/" element={<Navigate to="/Acceuil" />} />

        
        {/* Liste des medecins de chaque specialites */}
        <Route path="/liste-medecins" element={<ListeMedecins />} />

        {/* Route pour l'inscription des secrétaires */}
        <Route path="/register-secretaire" element={<RegisterSecretaire />} />

        {/* Dossier Medical */}
        <Route path="/dossier" element={<DossierMedicale />} />

         {/* Routes pour l'Espace Patient */}
        <Route path="/espace-patient" element={<EspacePatient />}>
          <Route path="specialite" element={<SpecialitesContent />} />
          <Route path="dossier" element={<DossierMedicale />} />
           <Route path="rendez-vous" element={<RendezvousTable />} />

          <Route path="specialite/salleAttente" element={<SalleAttente />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="profil" element={<ProfilPatient />} />

        </Route>
<Route  path="/espace-patient/specialite/salleAttente" element={<SalleAttente />}/>
      </Routes>
    </Router>
  );
}

export default App;