// components/DashboardContent.tsx
import React from 'react';
import StatisticsSection from './StatisticsSection'; // Import du composant pour les statistiques
import RecentPatientsTable from './RecentPatientsTable'; // Import du composant pour les patients récents
import QuickActions from './QuickActions';

export default function DashboardContent() {
  return (
    <div className="p-6 flex-grow bg-white rounded-lg shadow-lg m-6 h-full">
      {/* Titre */}
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Bienvenue, Dr. Rayen !</h1>

      {/* Section : Statistiques */}
      <StatisticsSection />

      {/* Section : Patients Récents */}
      <RecentPatientsTable />

      {/* Section : Actions Rapides */}
      <QuickActions />
    </div>
  );
}

 