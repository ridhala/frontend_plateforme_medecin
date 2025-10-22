import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Specialty = {
  id: string;
  name: string;
  icon?: string;
};

const specialties: Specialty[] = [
  { id: 'gen', name: 'General Medicine', icon: '🩺' },
  { id: 'cardio', name: 'Cardiology', icon: '❤️' },
  { id: 'derm', name: 'Dermatology', icon: '🧴' },
  { id: 'neuro', name: 'Neurology', icon: '🧠' },
  { id: 'pedia', name: 'Pediatrics', icon: '👶' },
  { id: 'ortho', name: 'Orthopedics', icon: '🦴' },
  { id: 'ent', name: 'ENT', icon: '👂' },
  { id: 'gyno', name: 'Gynecology', icon: '🌸' },
  { id: 'psych', name: 'Psychiatry', icon: '🧘' },
];

export default function SpecialtySelector() {
  const [selectedId, setSelectedId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const filteredSpecialties = specialties.filter(spec =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpecialtyClick = (specialtyId: string, specialtyName: string) => {
    setSelectedId(specialtyId);
    navigate('/liste-medecins', { 
      state: { 
        specialty: specialtyName 
      } 
    });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation Bar - Compact */}
      <nav className="bg-gradient-to-r from-blue-600 to-teal-500 shadow-md py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1 className="text-xl font-bold text-white">Medplat</h1>
            </div>
           
          </div>
        </div>
      </nav>

      {/* Hero Section - Compact */}
      <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Trouvez votre spécialiste</h1>
          <p className="text-sm md:text-base opacity-90">
            Prenez rendez-vous avec nos médecins experts en quelques clics
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white rounded-t-2xl"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
       {/* Search Section - Compact */}
<div className="bg-white rounded-xl shadow-md mb-8 border border-gray-200">
  <div className="p-6">
    {/* Search Bar - Compact */}
    <div className="relative max-w-2xl mx-auto mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Rechercher une spécialité..."
        className="block w-full pl-12 pr-4 py-3 border-0 text-base rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>

    {/* Specialties Grid - Compact */}
    <div className="mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Nos spécialités</h2>
      
      {filteredSpecialties.length === 0 ? (
        <div className="text-center py-10">
          <svg className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-500 mb-3">Aucune spécialité trouvée</h3>
          <button 
            onClick={() => setSearchTerm('')}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Réinitialiser
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpecialties.map((spec) => (
            <button
              key={spec.id}
              onClick={() => handleSpecialtyClick(spec.id, spec.name)}
              className={`p-4 border rounded-lg text-center transition-all duration-200 flex flex-col items-center ${
                selectedId === spec.id 
                  ? 'bg-blue-50 border-blue-300 shadow-md ring-1 ring-blue-300' 
                  : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-200'
              }`}
            >
              <span className="text-4xl mb-3">{spec.icon}</span>
              <h3 className="font-semibold text-gray-800 mb-1">{spec.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Voir médecins
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Médecins vérifiés</h3>
            <p className="text-gray-600 text-center">
              Tous nos praticiens sont diplômés et expérimentés
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">RDV rapides</h3>
            <p className="text-gray-600 text-center">
              Obtenez un rendez-vous en moins de 48h
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Paiement sécurisé</h3>
            <p className="text-gray-600 text-center">
              Payez en ligne simplement et en toute sécurité
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Medplat. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}