// pages/Home.tsx
import React from 'react';
import Sidebar from '../components/Sidebar'; // Import du composant Sidebar
import DashboardContent from '../components/DashboardContent'; // Import du composant DashboardContent

function Home() {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Contenu principal */}
      <DashboardContent />
    </div>
  );
}

export default Home;