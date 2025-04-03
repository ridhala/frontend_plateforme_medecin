import React from 'react';
import { logout } from '../../services/loginService'
import { Navigate, useNavigate } from 'react-router-dom';

type SidebarProps = {
  setActiveSection: (section: string) => void;
};
export default function Sidebar({ setActiveSection }: SidebarProps) {
  const [activeSection, setActiveSectionLocal] = React.useState<string>("Patients"); 
 const  navigate=useNavigate()
const Logout= async()=>{
   logout();
navigate('/login')
}
  const menuItems = [
    { title: "Patients", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    { title: "Rendez-vous", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { title: "Consultations", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    
  ];

  const profileItem = { 
    title: "Profil", 
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
  };

  const handleSectionClick = (section: string) => {
    setActiveSection(section); // Update parent state
    setActiveSectionLocal(section); // Update local state for active styling
  };

  return (
    <div className="bg-blue-800 text-white w-64 p-6 flex flex-col h-full">
      {/* Logo/Title */}
      <h1 
  className="text-2xl font-bold mb-8 cursor-pointer hover:text-blue-200 transition-colors duration-200"
  onClick={() => window.location.reload()}
>
  MEDPLAT
</h1>


      {/* Navigation Menu */}
      <nav className="flex flex-col flex-grow">
        {/* Main Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSectionClick(item.title)}
              className={`flex items-center space-x-3 text-white p-3 rounded-lg w-full transition-all duration-200 ${
                activeSection === item.title
                  ? "bg-blue-600 text-white shadow-md"
                  : "hover:bg-blue-700"
              }`}
            >
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
            </button>
          ))}
        </div>

        {/* Profile Section */}
        <div className="mt-auto">
          <button
            onClick={() => handleSectionClick(profileItem.title)}
            className={`flex items-center space-x-3 p-3 rounded-lg w-full transition-all duration-200 border-t border-blue-700 ${
              activeSection === profileItem.title
                ? "bg-blue-600 text-white shadow-md"
                : "hover:bg-blue-700"
            }`}
          >
            {/* Avatar Placeholder */}
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-semibold">Dr</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">Profil</span>
              <span className="text-xs text-blue-200">Utilisateur</span>
            </div>
          </button>
        </div>
      </nav>

      {/* Logout Button */}
      <button className="mt-4 text-white hover:bg-blue-700 p-2 rounded-lg w-full text-left"
      onClick={()=> Logout()}>
        Logout
      </button>
    </div>
  );
}