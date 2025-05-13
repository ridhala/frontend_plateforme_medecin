import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserCircleIcon,
  DocumentTextIcon,
  FolderIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  CalendarIcon,
  EyeIcon,
  PlusIcon,
  CloudArrowUpIcon
} from '@heroicons/react/24/outline';
import DossierMedicale from './DossierMedicale';

// Mock data pour les spécialités
const specialites = [
  { id: 1, name: 'General Medicine', icon: '🩺', doctors: 18 },
  { id: 2, name: 'Cardiology', icon: '❤️', doctors: 12 },
  { id: 3, name: 'Dermatology', icon: '🧴', doctors: 8 },
  { id: 4, name: 'Neurology', icon: '🧠', doctors: 7 },
  { id: 5, name: 'Pediatrics', icon: '👶', doctors: 15 },
  { id: 6, name: 'Orthopedics', icon: '🦴', doctors: 9 },
  { id: 7, name: 'ENT', icon: '👂', doctors: 6 },
  { id: 8, name: 'Gynecology', icon: '🌸', doctors: 11 },
  { id: 9, name: 'Psychiatry', icon: '🧘', doctors: 5 },
];


const EspacePatient = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('sp');
  const navigate = useNavigate();
  const location = useLocation();

  // Synchronisation automatique état/URL
  useEffect(() => {
    const path = location.pathname;
    if (path.endsWith('/dossier')) {
      setSelectedMenuItem('dossier');
    } else if (path.endsWith('/documents')) {
      setSelectedMenuItem('documents');
    } else if (path.endsWith('/chatbot')) {
      setSelectedMenuItem('chatbot');
    } else if (path.endsWith('/settings')) {
      setSelectedMenuItem('settings');
    } else {
      setSelectedMenuItem('sp');
    }
  }, [location]);

  // Navigation corrigée
  const handleMenuClick = (key: string) => {
    setSelectedMenuItem(key);
    switch (key) {
      case 'sp':
        navigate('/espace-patient');
        break;
      case 'dossier':
        navigate('/espace-patient/dossier');
        break;
      case 'documents':
        navigate('/espace-patient/documents');
        break;
      case 'chatbot':
        navigate('/espace-patient/chatbot');
        break;
      case 'settings':
        navigate('/espace-patient/settings');
        break;
      default:
        navigate('/espace-patient');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('Fichier sélectionné:', file.name);
      // Ici vous pouvez ajouter la logique pour uploader le fichier
    }
  };

  const menuItems = [
    { key: 'sp', icon: <HomeIcon className="h-5 w-5" />, label: 'Accueil' },
    { key: 'dossier', icon: <DocumentTextIcon className="h-5 w-5" />, label: 'Dossier Médical' },
    { key: 'documents', icon: <FolderIcon className="h-5 w-5" />, label: 'Mes Documents' },
    { key: 'chatbot', icon: <ChatBubbleLeftRightIcon className="h-5 w-5" />, label: 'AI Chatbot' },
    { key: 'settings', icon: <Cog6ToothIcon className="h-5 w-5" />, label: 'Paramètres' },
  ];

  const renderContent = () => {
    switch (selectedMenuItem) {
      case 'sp':
        return <SpecialitesContent />;
      case 'dossier':
        return <DossierMedicale />;
      case 'documents':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mes Documents Médicaux</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
                <CloudArrowUpIcon className="h-12 w-12 text-blue-500 mb-4" />
                <p className="text-gray-600 mb-4">Glissez-déposez vos fichiers ici ou</p>
                <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  <PlusIcon className="h-5 w-5 inline mr-2" />
                  Sélectionner un fichier
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">Formats acceptés: PDF, DOC, JPG, PNG</p>
              </div>
            </div>
          </div>
        );
      case 'chatbot':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Assistant Médical Virtuel</h2>
            <div className="bg-white rounded-xl shadow-sm p-4 h-64">
              <p className="text-gray-600">Interface du chatbot</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Paramètres du Profil</h2>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <p className="text-gray-600">Contenu pour les paramètres</p>
            </div>
          </div>
        );
      default:
        return <div className="p-6">Page non trouvée</div>;
    }
  };

  const SpecialitesContent = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos Spécialités</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialites.map((spec) => (
          <div 
            key={spec.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 hover:border-blue-200"
            onClick={() => navigate(`/liste-medecins?specialite=${spec.name}`)}
          >
            <div className="p-5">
              <div className="flex items-center mb-3">
                <div className="text-2xl mr-3">
                  {spec.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{spec.name}</h3>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{spec.doctors} médecins disponibles</span>
                <span className="text-blue-600 font-medium flex items-center">
                  Voir médecins <EyeIcon className="h-4 w-4 ml-1" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Vos Rendez-vous Récents</h3>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Médecin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spécialité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>15/06/2023 - 10:30</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Dr. Dupont</td>
                <td className="px-6 py-4 whitespace-nowrap">Cardiologie</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Terminé</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>20/06/2023 - 14:00</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">Dr. Martin</td>
                <td className="px-6 py-4 whitespace-nowrap">Dermatologie</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Confirmé</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Nouveau design */}
      <div className={`bg-gradient-to-b from-blue-700 to-blue-600 shadow-lg transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} relative border-r-2 border-blue-800`}>
        <div className="flex flex-col h-full">
          {/* Logo et bouton collapse */}
          <div className="p-4 flex items-center justify-between border-b border-blue-800">
            {!collapsed && <h1 className="text-xl font-bold text-white tracking-wide">MEDPLAT</h1>}
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="text-blue-200 hover:text-white transition-colors"
            >
              {collapsed ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              )}
            </button>
          </div>

          {/* Profil utilisateur */}
          <div className="p-4 flex flex-col items-center border-b border-blue-800">
            <div className="relative mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                <UserCircleIcon className="h-8 w-8 text-white" />
              </div>
              {!collapsed && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {!collapsed && (
              <>
                <h3 className="font-medium text-white">John Doe</h3>
                <p className="text-xs text-blue-200">Patient</p>
              </>
            )}
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="space-y-2 p-3">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => handleMenuClick(item.key)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all ${selectedMenuItem === item.key ? 'bg-blue-800 text-white shadow-md' : 'text-blue-200 hover:bg-blue-700 hover:text-white'}`}
                  >
                    <span className="flex items-center justify-center w-6 h-6">
                      {React.cloneElement(item.icon, { className: `h-5 w-5 ${selectedMenuItem === item.key ? 'text-white' : 'text-blue-200'}` })}
                    </span>
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bouton de déconnexion */}
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

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedMenuItem === 'sp' && 'Bienvenue dans votre espace'}
              {selectedMenuItem === 'dossier' && 'Dossier Médical Complet'}
              {selectedMenuItem === 'documents' && 'Mes Documents'}
              {selectedMenuItem === 'chatbot' && 'Assistant Médical'}
              {selectedMenuItem === 'settings' && 'Paramètres du Compte'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Dernière connexion: Aujourd'hui à 14:30</span>
              <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default EspacePatient;