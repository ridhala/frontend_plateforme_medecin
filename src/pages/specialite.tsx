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
    // Add your actual booking logic here
  };

  return (
    <div className="w-full min-h-screen p-6 space-y-8 bg-white">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Find Your Specialist</h1>
        <p className="text-gray-600">Book an appointment with our expert doctors</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with search */}
        <div className="w-full md:w-1/4 space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h2 className="font-semibold text-lg text-blue-800 mb-4">Search & Filter</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Specialties</label>
                <input
                  type="text"
                  placeholder="Type to search..."
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Quick Filters</h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
                  >
                    All Specialties
                  </button>
                  <button 
                    onClick={() => setSearchTerm('ped')}
                    className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
                  >
                    Pediatrics
                  </button>
                  <button 
                    onClick={() => setSearchTerm('cardio')}
                    className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200"
                  >
                    Cardiology
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Need help?</h3>
            <p className="text-sm text-gray-600">Our support team is available 24/7 to assist you with bookings.</p>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
              Contact Support →
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Select a Medical Specialty</h2>
            
            {selectedId && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-blue-800">Selected Specialty</h3>
                  <p className="text-gray-700">
                    {specialties.find(s => s.id === selectedId)?.name}
                  </p>
                </div>
                <button
                  onClick={handleBooking}
                  className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                >
                  Book Appointment
                </button>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSpecialties.map((spec) => (
                <button
                  key={spec.id}
                  onClick={() => setSelectedId(spec.id)}
                  className={`p-4 border rounded-lg text-center transition-all duration-200 ${selectedId === spec.id 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-lg transform scale-105' 
                    : 'bg-white hover:bg-blue-50 hover:border-blue-300 hover:shadow-md'}`}
                >
                  <span className="text-3xl block mb-2">{spec.icon}</span>
                  <h3 className="font-medium">{spec.name}</h3>
                </button>
              ))}
            </div>
            
            {filteredSpecialties.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">No specialties found matching your search.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-blue-600 hover:text-blue-800"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
          
          {/* Additional information section */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Easy Booking</h3>
              <p className="text-sm text-gray-600">Simple online process with instant confirmation</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Expert Doctors</h3>
              <p className="text-sm text-gray-600">Board-certified specialists in every field</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Our team is always here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}