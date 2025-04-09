import { useState } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import Sidebar from '../components/home/Sidebar';
import DashboardContent from '../components/home/DashboardContent';

export default function Home() {
  const { section } = useParams(); // Get section from URL
  const [activeSection, setActive] = useState<string | null>(section || null);

 

  
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        setActiveSection={setActive} 
      />
      <div className="flex-grow p-6 overflow-auto">
        {/* Using Outlet for nested routes */}
        <Outlet context={{ activeSection }} />
               
          <DashboardContent activeSection={activeSection}
          setActiveSection={setActive} />
      </div>
    </div>
  );
}