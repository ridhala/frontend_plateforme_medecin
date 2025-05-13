import { useEffect, useState } from 'react';
import StatisticsSection from './StatisticsSection';
import PatientsList from './PatientsList';
import AppointmentsList from './AppointmentsList';
import ConsultationsList from './ConsultationsList';
import Profil from './Profil';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import SecretaireForm from './secretaire';
import { Secretaire } from '../../types/secretairetype';
import { getsecretaire } from '../../services/serviceshome/profilservice';
import Messagerie from './messagerie';


interface DashboardProps {
  activeSection: string | null;
  setActiveSection: (section: string) => void; // Add this prop
}

export default function DashboardContent({ activeSection, setActiveSection }: DashboardProps) {

  const params = useParams();
const [profil, setprofil]= useState("");
const [nom, setnom]= useState("")
const [prenom, setprenom]= useState("")
const [secprofil, setsecprofil]=useState<Secretaire>()
// profil secretaire pour secretaire 
 useEffect(() => {
    const Profilesecretaire = async () => {
      try {
   const profil=  await getsecretaire()
       setsecprofil(profil)
      } catch (err) {
        console.error('Erreur:', err);
      } };
      Profilesecretaire()
  }, []);





  // Sync URL parameter with active section
  useEffect(() => {
    if (params.section) {
      setActiveSection(params.section);
    }
  }, [params.section, setActiveSection]);

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/update/profile', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        setprofil(response.data.utilisateur.photo_profil);
        setnom(response.data.utilisateur.nom);
        setprenom(response.data.utilisateur.prenom);

      } catch (err) {
        console.error('Erreur:', err);
      }
     
    };

    ProfileData();
  }, []);

  return (
  <div className="flex-grow p-4 sm:p-6 bg-gray-100 overflow-auto">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="flex items-center gap-3 flex-wrap">
        {!profil ? (
          <div className="flex items-center gap-2 text-base sm:text-xl font-semibold">
            <span>{secprofil?.nom_secretaire} {secprofil?.prenom_secretaire}</span>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src="https://static.vecteezy.com/system/resources/previews/014/809/732/non_2x/modeling-agent-female-line-icon-vector.jpg"
                alt="Secretary Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-base sm:text-xl font-semibold">
            <span>Dr {nom} {prenom}</span>
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gray-400">
              <img
                src={profil}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Statistiques */}
    <div className="mb-4">
      <StatisticsSection activeSection={activeSection} />
    </div>

    {/* Dynamic Content - Responsive grid */}
    <div className="grid grid-cols-1 gap-5">
      {activeSection === "patients" && (
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <PatientsList />
        </div>
      )}
      {activeSection === "rendez-vous" && (
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <AppointmentsList />
        </div>
      )}
      {activeSection === "secretaire" && (
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <SecretaireForm />
        </div>
      )}
      {activeSection === "consultations" && (
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <ConsultationsList />
        </div>
      )}
      {activeSection === "messagerie" && (
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <Messagerie />
        </div>
      )}
      {activeSection === "profil" && (
        <div className="bg-white p-4 rounded-lg shadow w-full">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Profil</h2>
          <Profil />
        </div>
      )}
    </div>
  </div>
);

}