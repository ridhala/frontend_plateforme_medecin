import { useState } from 'react';

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

  const filteredSpecialties = specialties.filter(spec =>
    spec.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBooking = () => {
    if (!selectedId) return;
    const specialty = specialties.find(s => s.id === selectedId);
    alert(`Booking appointment with ${specialty?.name} specialist`);
  };

  return (
    <div className="w-full min-h-screen p-4 md:p-6 bg-white">
      {/* Header optimisé mobile */}
      <header className="text-center space-y-2 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Find Your Specialist</h1>
        <p className="text-sm md:text-base text-gray-600">Book an appointment with our expert doctors</p>
      </header>
      
      {/* Contenu principal en colonne pour mobile */}
      <div className="flex flex-col gap-4">
        {/* Barre de recherche mobile first */}
        <div className="w-full bg-blue-50 p-3 md:p-4 rounded-lg sticky top-0 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search specialties..."
              className="w-full p-2 md:p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-gray-400 absolute left-3 top-2.5 md:top-3.5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filtres rapides pour mobile */}
        <div className="flex overflow-x-auto pb-2 gap-2 md:hidden">
          {['All', 'Pediatrics', 'Cardiology'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSearchTerm(filter === 'All' ? '' : filter.toLowerCase())}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs ${
                (filter === 'All' && !searchTerm) || 
                searchTerm.toLowerCase() === filter.toLowerCase()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sélection de spécialité - Optimisé pour tactile */}
        <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
          {selectedId && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-2 sm:mb-0">
                <h3 className="font-medium text-blue-800 text-sm md:text-base">Selected Specialty</h3>
                <p className="text-gray-700 text-sm md:text-base">
                  {specialties.find(s => s.id === selectedId)?.name}
                </p>
              </div>
              <button
                onClick={handleBooking}
                className="w-full sm:w-auto py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm md:text-base"
              >
                Book Appointment
              </button>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSpecialties.map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSelectedId(spec.id)}
                className={`p-3 border rounded-lg text-center transition-all duration-200 flex flex-col items-center ${
                  selectedId === spec.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                    : 'bg-white hover:bg-blue-50 border-gray-200'
                }`}
              >
                <span className="text-2xl md:text-3xl block mb-1">{spec.icon}</span>
                <h3 className="font-medium text-sm md:text-base">{spec.name}</h3>
              </button>
            ))}
          </div>
          
          {filteredSpecialties.length === 0 && (
            <div className="text-center py-6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 mx-auto text-gray-400 mb-2"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-sm md:text-base">No specialties found matching your search.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm md:text-base"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Infos supplémentaires - Stack sur mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <div className="p-3 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 text-sm md:text-base mb-1">Easy Booking</h3>
            <p className="text-gray-600 text-xs md:text-sm">Simple online process with instant confirmation</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-800 text-sm md:text-base mb-1">Expert Doctors</h3>
            <p className="text-gray-600 text-xs md:text-sm">Board-certified specialists in every field</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <h3 className="font-semibold text-orange-800 text-sm md:text-base mb-1">24/7 Support</h3>
            <p className="text-gray-600 text-xs md:text-sm">Our team is always here to help you</p>
          </div>
        </div>

        {/* Section aide mobile */}
        <div className="md:hidden p-3 bg-gray-50 rounded-lg mt-2">
          <h3 className="font-semibold text-gray-700 text-sm mb-1">Need help?</h3>
          <p className="text-gray-600 text-xs mb-2">Our support team is available 24/7</p>
          <button className="text-blue-600 hover:text-blue-800 text-xs flex items-center">
            Contact Support
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3 ml-1"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}