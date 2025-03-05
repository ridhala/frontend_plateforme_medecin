import React from 'react';

type SidebarProps = {
  setActiveSection: (section: string) => void;
};

export default function Sidebar({ setActiveSection }: SidebarProps) {
  const menuItems = [
    { title: "Patients", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { title: "Rendez-vous", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { title: "Consultations", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { title: "Profil", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex-shrink-0 w-80 h-full">
      <h1 className="text-2xl font-bold text-teal-700 mb-6">MedDashboard</h1>
      <nav className="space-y-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(item.title)}
            className="block text-gray-700 hover:text-teal-600 transition-colors w-full text-left"
          >
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
                  strokeWidth="2"
                  d={item.icon}
                />
              </svg>
              <span>{item.title}</span>
            </span>
          </button>
        ))}
      </nav>
      <img
        alt="Your Company"
        className="mx-auto h-20 w-auto mb-10 mt-10"
        src="/ic-ne-de-médecin-88636477.jpg"
      />
    </div>
  );
}