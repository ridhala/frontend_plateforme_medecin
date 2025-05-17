import { useState, useEffect } from 'react';
import { logout } from '../../services/authentification/loginService';
import { useNavigate, NavLink } from 'react-router-dom';
import { getsecretaire } from '../../services/serviceshome/profilservice';
import { Secretaire } from '../../types/secretairetype';

type SidebarProps = {
  setActiveSection: (section: string) => void;
};

export default function Sidebar({ setActiveSection }: SidebarProps) {
  const navigate = useNavigate();

  const Logout = async () => {
     logout();
   await navigate('/login');
  };
  const [open, setOpen] = useState(false); // pour gérer l’ouverture sur mobile

const [secprofil, setsecprofil]=useState<Secretaire>()
// profil secretaire pour secretaire 
 useEffect(() => {
    const Profilesecretaire = async () => {
      
   const profil=  await getsecretaire()
       setsecprofil(profil)
        };
      Profilesecretaire()
  }, []);

  const secretaryMenuItems = [
    { 
      title: "patients", 
      path: "patients",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
    },
    { 
      title: "rendez-vous", 
      path: "rendez-vous",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
    }
  ];



  const menuItems = [
    { 
      title: "patients", 
      path: "patients",
      icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
    },
    { 
      title: "rendez-vous", 
      path: "rendez-vous",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
    },
    { 
      title: "consultations", 
      path: "consultations",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
    },
    { 
      title: "messagerie", 
      path: "messagerie",
      icon: "M18.364 5.636a9 9 0 11-12.728 0M12 17v.01M12 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" 
    },
  ];

  const profileItem = { 
    title: "profil", 
    path: "profil",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
  };

  

  return (
  <>
    {/* Toggle button for mobile */}
    <div className="md:hidden bg-blue-800 text-white p-4 flex justify-between items-center">
     { /*<NavLink to="/home" className="text-xl font-semibold">MP</NavLink>*/}
      <button onClick={() => setOpen(!open)} className="focus:outline-none">
        ☰
      </button>
    </div>

    {/* Sidebar */}
    <div
      className={`
        fixed md:static top-0 left-0 z-40 bg-blue-700 text-white w-64 h-full p-6 flex flex-col transform
        transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0
      `}
    >
      {/* Logo/Title */}
      <NavLink 
        to="/home" 
        className="text-2xl font-bold mb-8 cursor-pointer hover:text-blue-200 transition-colors duration-200 hidden md:block"
      >
        MEDPLAT
      </NavLink>

      {/* Navigation Menu */}
      <nav className="flex flex-col flex-grow">
        {/* Main Menu Items */}
        {secprofil ? (
          <div className="space-y-2">
            {secretaryMenuItems.map((item, index) => (
              <NavLink
                key={index}
                to={`/home/${item.path}`}
                onClick={() => {
                  setActiveSection(item.title);
                  setOpen(false);
                }}
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg w-full transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "hover:bg-blue-700"
                  }`
                }
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={`/home/${item.path}`}
                onClick={() => {
                  setActiveSection(item.title);
                  setOpen(false);
                }}
                className={({ isActive }) => 
                  `flex items-center space-x-3 p-3 rounded-lg w-full transition-all duration-200 ${
                    isActive 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "hover:bg-blue-700"
                  }`
                }
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                </svg>
                <span>{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}

        {/* Profile Section */}
        <div className="mt-auto">
          <NavLink
            to={`/home/${profileItem.path}`}
            onClick={() => {
              setActiveSection(profileItem.title);
              setOpen(false);
            }}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg w-full transition-all duration-200 border-t border-blue-700 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "hover:bg-blue-700"
              }`
            }
          >
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-sm font-semibold">Dr</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium">{profileItem.title}</span>
              <span className="text-xs text-blue-200">Utilisateur</span>
            </div>
          </NavLink>
        </div>
      </nav>

      {/* Logout Button */}
      <button 
        className="mt-4 text-white hover:bg-blue-700 p-2 rounded-lg w-full text-left flex  "
        onClick={Logout}
      >
         Logout
      </button>
    </div>
  </>
);

}