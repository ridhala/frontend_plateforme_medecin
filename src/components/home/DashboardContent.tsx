import { useEffect } from 'react';
import StatisticsSection from './StatisticsSection';
import PatientsList from './PatientsList';
import AppointmentsList from './AppointmentsList';
import ConsultationsList from './ConsultationsList';
import Profil from './Profil';
import Chat from '../Messagerie/Chat';
import {  useParams } from 'react-router-dom';

interface DashboardProps {
  activeSection: string | null;
  setActiveSection: (section: string) => void; // Add this prop
}

export default function DashboardContent({ activeSection, setActiveSection }: DashboardProps) {
  const params = useParams();

  // Sync URL parameter with active section
  useEffect(() => {
    if (params.section) {
      console.log(params)
      setActiveSection(params.section);
    }
  }, [params.section, setActiveSection]);


  return (
    <div className="flex-grow p-6 bg-gray-100 overflow-auto">
      {/* Header remains the same */}
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

      {/* Statistics Section */}
      <div className="mb-4">
        <StatisticsSection activeSection={activeSection} />
      </div>

      {/* Dynamic Content Section */}
      <div className="grid grid-cols-1 gap-6 w-300">
        {activeSection === "patients" && (
          <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <PatientsList />
          </div>
        )}
        
        {activeSection === "rendez-vous" && (
          <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <AppointmentsList />
          </div>
        )}

        {activeSection === "consultations" && (
          <div className="bg-white p-4 rounded-lg shadow-lg w-full">
            <ConsultationsList />
          </div>
        )}

        {activeSection === "profil" && (
          <div className="bg-white p-3 rounded-lg shadow-lg w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Profil</h2>
            <Profil/>
          </div>
        )}

        
      </div>
    </div>
  );
}