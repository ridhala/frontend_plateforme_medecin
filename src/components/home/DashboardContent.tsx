import React from 'react';
import StatisticsSection from './StatisticsSection';
import PatientsList from './PatientsList';
import AppointmentsList from './AppointmentsList';
import ConsultationsList from './ConsultationsList';
import QuickActions from './QuickActions';
import Profil from './Profil';
import Chat from '../Messagerie/Chat';

interface DashboardProps {
  activeSection: string | null;
}

export default function DashboardContent({ activeSection }: DashboardProps) {
  return (
    <div className="flex-grow p-6 bg-gray-100 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-lg border border-gray-300"
          />
          <div className="flex items-center space-x-2">
  <span>Dalanda Chtioui</span>
  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-400">
    <img
      src="https://www.cliniquecic.ch/data/dataimages/Upload/thumbnails/zoom_PapaNata.jpg"
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>
  <div>
      
      <Chat doctorId={''}/>
    </div>
</div>

        </div>
      </div>

      {/* ✅ Haut : Statistiques et graphiques */}
      <div className="mb-6">
        <StatisticsSection activeSection={activeSection} />
        
      </div>

     {/* ✅ Bas : Affichage dynamique des listes (patients, rendez-vous, consultations) */}
     <div className="grid grid-cols-1 gap-6 w-full">
        {activeSection === "Patients" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <PatientsList />
          </div>
        )}
        {activeSection === "Rendez-vous" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <AppointmentsList />
          </div>
        )}
        {activeSection === "Consultations" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <ConsultationsList />
          </div>
        )}
        {activeSection === "Profil" && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Profil</h2>
            <Profil/>
           
          </div>
        )}
        {!activeSection && (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bienvenue</h2>
            <p>Sélectionnez une section dans la barre latérale pour voir les détails.</p>
          </div>
        )}
      </div>
    </div>
  );
}