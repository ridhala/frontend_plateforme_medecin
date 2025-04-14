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

  const handleLogout = () => {
    // Add your logout logic here
    alert('You have been logged out successfully');
    // Typically you would redirect to login page or clear session
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Premium Navigation Bar */}
      <nav className="bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center space-x-2">
              <svg className="h-10 w-10 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h1 className="text-2xl font-bold text-white tracking-tight">Medplat</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Notifications
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Specialist</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Connect with top medical professionals through Medplat's advanced platform
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-3xl"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8">
        {/* Search and Selection Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 border border-gray-100">
          <div className="p-8">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-10">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search specialties, doctors, or symptoms..."
                className="block w-full pl-14 pr-5 py-4 border-0 text-lg rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Selected Specialty Banner */}
            {selectedId && (
              <div className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-l-4 border-blue-500 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-md">
                <div className="mb-4 md:mb-0">
                  <h3 className="font-medium text-blue-800 text-lg">Your Selected Specialty</h3>
                  <p className="text-gray-800 text-2xl font-bold">
                    {specialties.find(s => s.id === selectedId)?.name}
                  </p>
                </div>
                <button
                  onClick={handleBooking}
                  className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-500 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg"
                >
                  Book Appointment Now
                  <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}

            {/* Specialties Grid */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Medical Specialties</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                  >
                    View All
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                    <svg className="w-4 h-4 inline mr-1 -mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filters
                  </button>
                </div>
              </div>
              
              {filteredSpecialties.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="h-20 w-20 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No specialties found</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">We couldn't find any specialties matching your search. Try different keywords.</p>
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Reset Search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSpecialties.map((spec) => (
                    <button
                      key={spec.id}
                      onClick={() => setSelectedId(spec.id)}
                      className={`p-6 border rounded-xl text-center transition-all duration-300 flex flex-col items-center ${
                        selectedId === spec.id 
                          ? 'bg-gradient-to-br from-blue-100 to-teal-100 border-blue-300 transform scale-[1.02] shadow-lg ring-2 ring-blue-400' 
                          : 'bg-white hover:bg-gray-50 border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <span className="text-5xl block mb-4">{spec.icon}</span>
                      <h3 className="font-bold text-xl text-gray-800 mb-2">{spec.name}</h3>
                      <p className={`mt-2 text-sm ${
                        selectedId === spec.id ? 'text-blue-600 font-medium' : 'text-gray-500'
                      }`}>
                        {selectedId === spec.id ? '✓ Selected' : 'Click to select this specialty'}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-500 rounded-2xl p-8 text-white mb-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-lg font-medium">Qualified Specialists</div>
              <div className="text-blue-100 mt-1">Across all medical fields</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg font-medium">Availability</div>
              <div className="text-blue-100 mt-1">Emergency services available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-lg font-medium">Patient Satisfaction</div>
              <div className="text-blue-100 mt-1">Based on recent surveys</div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Medplat?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Verified Specialists</h3>
              <p className="text-gray-600 text-center">
                All doctors are thoroughly vetted with verified credentials and years of experience.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-teal-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Fast Appointments</h3>
              <p className="text-gray-600 text-center">
                Get seen quickly with our streamlined booking system and minimal wait times.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600 text-center">
                No hidden fees. See costs upfront with insurance estimates included.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2 bg-gradient-to-r from-blue-600 to-teal-500 p-10 flex items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Need immediate medical assistance?</h3>
                <p className="text-blue-100 mb-6">
                  Our emergency team is available 24/7 to provide immediate support and guidance.
                </p>
                <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200">
                  Contact Emergency Support
                </button>
              </div>
            </div>
            <div className="md:w-1/2 p-10 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Have questions?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is here to help you with any questions about specialties, doctors, or appointments.
              </p>
              <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 inline-flex items-center">
                Chat with Support
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Premium Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center mb-4">
                <svg className="h-8 w-8 text-teal-400 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xl font-bold">Medplat</span>
              </div>
              <p className="text-gray-400 text-sm">
                Revolutionizing healthcare through technology and compassionate care.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find a Doctor</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Online Consultations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Emergency Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Health Records</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-teal-400">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Medplat, Inc. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}