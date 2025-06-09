import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  CalendarDaysIcon,
  FolderOpenIcon,
} from '@heroicons/react/24/outline';
import { fetchaccount } from '../services/servicedashpatient/servicepatient';
import { logout } from '../services/authentification/loginService';
import { addpatient } from '../types/patienttype';

interface MenuItem {
  key: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  path: string;
}

const EspacePatient: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [account, setaccount] = useState<addpatient>();


  const navigate = useNavigate();
  const location = useLocation();
const menuItems: MenuItem[] = [
  { key: 'accueil', icon: HomeIcon, label: 'Accueil', path: '/espace-patient/specialite' },
  { key: 'dossier', icon: FolderOpenIcon, label: 'Dossier Médical', path: '/espace-patient/dossier' },
  { key: 'chatbot', icon: ChatBubbleLeftRightIcon, label: 'AI Chatbot', path: '/espace-patient/chatbot' },
  { key: 'rendezvous', icon: CalendarDaysIcon, label: 'Mes Rendez-vous', path: '/espace-patient/rendez-vous' },
  { key: 'profil', icon: UserCircleIcon, label: 'Profil', path: '/espace-patient/profil' },
];

  const handleMenuClick = (path: string) => {
    if (location.pathname !== path) {
      navigate(path, { state: { account: account } });
      console.log(account)
    }
  };
useEffect(() => {
  const affichage = async () => {
    const res = await fetchaccount();
    
    const processedAccount: addpatient = {
      cin_patient: res.cin_patient ?? "",
      nom_patient: res.nom_patient ?? "",
      prenom_patient: res.prenom_patient ?? "",
      sex: res.sex ?? "",
      date_naissance: res.date_naissance ?? "",
      email: res.email ?? "",
      telephone: typeof res.telephone === 'number' ? res.telephone : "", // Ensure number or ""
    };

    setaccount(processedAccount);
  };
  affichage();
}, []);

  const handleLogout = () => {
  logout()
    navigate('/login');
  };

  const currentTitle = () => {
    if (location.pathname.includes('/specialite')) return 'Bienvenue dans votre espace';
    if (location.pathname.includes('/dossier')) return 'Dossier Médical Complet';
    if (location.pathname.includes('/chatbot')) return 'Assistant Médical';
    if (location.pathname.includes('/settings')) return 'Paramètres du Compte';
        if (location.pathname.includes('/rendez-vous')) return 'Liste des rendez-vous Prises';
        if (location.pathname.includes("profil")) return 'Profil';


    return '';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <div
        className={`bg-gradient-to-b from-blue-700 to-blue-600 shadow-lg transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } relative border-r-2 border-blue-800`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 flex items-center justify-between border-b border-blue-800">
            {!collapsed && <h1 className="text-xl font-bold text-white tracking-wide">MEDPLAT</h1>}
            <button onClick={() => setCollapsed(!collapsed)} className="text-blue-200 hover:text-white transition-colors">
              {collapsed ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>

          {/* User Info */}
          <div className="p-4 flex flex-col items-center border-b border-blue-800">
            <div className="relative mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                <UserCircleIcon className="h-8 w-8 text-white" />
              </div>
            </div>
            {!collapsed && (
              <>
                <h3 className="font-medium text-white">{account?.nom_patient}</h3>
                <p className="font-medium text-white">{account?.prenom_patient}</p>
              </>
            )}
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const selected = location.pathname === item.path;
                return (
                  <li key={item.key}>
                    <button
                      onClick={() => handleMenuClick(item.path)}
                      className={`w-full flex items-center p-3 rounded-lg transition-all ${
                        selected ? 'bg-blue-800 text-white shadow-md' : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center justify-center w-6 h-6">
                        <Icon className="h-5 w-5" />
                      </span>
                      {!collapsed && <span className="ml-3">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded-lg text-blue-200 hover:bg-blue-700 hover:text-white transition-colors"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">Déconnexion</span>}
            </button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">{currentTitle()}</h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Dernière connexion: Aujourd'hui à 14:30</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EspacePatient;
