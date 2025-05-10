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
import SalleAttente from './pages/SalleAttente';


import DashboardContent from './components/home/DashboardContent';
import Sidebar from './components/home/Sidebar';
import Calendar from './components/home/calendar';
import AdminDashboard from './pages/dashboardadmin';
import AdminLogin from './pages/loginadmin';

////////////////////////////////////////////////////////////////////////////////////////////
function App() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <Router>
      <Routes>
      
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />

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
        <Route path="*" element={<Register />} />


        <Route path="admindashboard" element={<AdminDashboard />} />
                <Route path="loginadmin" element={<AdminLogin />} />


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