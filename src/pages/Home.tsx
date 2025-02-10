import React from 'react';

export default function Home() {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 w-80 h-full">
        
        <h1 className="text-2xl font-bold text-teal-700 mb-6">MedDashboard</h1>
        <nav className="space-y-4">
          
          
          <a href="https://www.youtube.com/watch?v=rY8DJ5EZzZo&list=LL" target='_blank' className="block text-gray-700 hover:text-sky-600 transition-colors">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span>Patients</span>
            </span>
          </a>
          <a href="#" className="block text-gray-700 hover:text-teal-600 transition-colors">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Rendez-vous</span>
            </span>
          </a>
          <a href="#" className="block text-gray-700 hover:text-teal-600 transition-colors">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Consultations</span>
            </span>
          </a>
          <a href="#" className="block text-gray-700 hover:text-teal-600 transition-colors">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Profil</span>
            </span>
          </a>
          <a href="#" className="block text-gray-700 hover:text-teal-600 transition-colors">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>raeyn </span>
            </span>
          </a>
        </nav>
        {/* Logo */}
        <img
          alt="Your Company"
          src="https://thumbs.dreamstime.com/b/ic-ne-de-m%C3%A9decin-88636477.jpg"
          className="mx-auto h-20 w-auto mb-10"
        />
      </div>

      {/* Contenu principal */}
      <div className="p-6 flex-grow bg-white rounded-lg shadow-lg m-6 h-full">
        
      <h1 className="text-2xl font-bold text-black-700 mb-6">Bienvenue, Dr. Rayen !</h1>

        {/* Section : Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Carte 1 : Patients */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-teal-700">Total Patients</h3>
            <p className="text-3xl font-bold text-teal-800 mt-2">125</p>
          </div>

          {/* Carte 2 : Rendez-vous */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-teal-700">Rendez-vous Aujourd'hui</h3>
            <p className="text-3xl font-bold text-teal-800 mt-2">10</p>
          </div>

          {/* Carte 3 : Consultations */}
          <div className="bg-teal-100 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-teal-700">Consultations Cette Semaine</h3>
            <p className="text-3xl font-bold text-teal-800 mt-2">25</p>
          </div>
        </div>

        {/* Section : Patients Récents */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Patients Récents</h3>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                <tr>
                  <th className="py-2 px-4">Nom</th>
                  <th className="py-2 px-4">Âge</th>
                  <th className="py-2 px-4">Dernier Rendez-vous</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4">Rayen Dlimi</td>
                  <td className="py-2 px-4">22</td>
                  <td className="py-2 px-4">2023-10-15</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4">Hakim Aouini</td>
                  <td className="py-2 px-4">45</td>
                  <td className="py-2 px-4">2023-10-14</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Mohamed Ali</td>
                  <td className="py-2 px-4">28</td>
                  <td className="py-2 px-4">2023-10-13</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section : Actions */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h3>
          <div className="flex space-x-4">
            <button className="bg-teal-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-700">
              Ajouter Patient
            </button>
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">
              Planifier Rendez-vous
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}