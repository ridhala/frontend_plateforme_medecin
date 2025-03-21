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
import VerificationSuccess from './pages/verifemail';
////////////////////////////////////////////////////////////////////////////////////////////
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
<Route path='/verifemail' element={<VerificationSuccess/>}/>
        {/* Route for the register page */}
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Route for the forgot password page */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Register />} />
 
        <Route path='/Acceuil' element={<Accueil />}/>
        {/* Fallback route for unknown paths (redirects to home) */}
        <Route path="/" element={<Navigate to="/Acceuil" />} />
      </Routes>
    </Router>
    
  );
}

export default App;