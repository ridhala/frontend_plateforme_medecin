import React from 'react';
import StatisticsSection from './StatisticsSection';
import PatientsList from './PatientsList';
import AppointmentsList from './AppointmentsList';
import ConsultationsList from './ConsultationsList';

interface DashboardProps {
  activeSection: string | null;
}

export default function DashboardContent({ activeSection }: DashboardProps) {
  return (
    <div className="p-6 flex-grow bg-white rounded-lg shadow-lg m-6 h-full">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">Tableau de bord</h1>
      {activeSection === "Patients" && <PatientsList />}
      {activeSection === "Rendez-vous" && <AppointmentsList />}
      {activeSection === "Consultations" && <ConsultationsList />}
      {activeSection === "Profil" && <div><h2 className="text-xl font-bold text-gray-800 mb-4">Profil</h2><p>Profil content goes here.</p></div>}
      {!activeSection && <StatisticsSection />}
    </div>
  );
}