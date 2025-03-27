import React, { useState } from 'react';
import Sidebar from '../components/home/Sidebar';
import DashboardContent from '../components/home/DashboardContent';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="flex-grow p-6 overflow-auto">
       
        {/* ✅ Bas : DashboardContent for dynamic lists */}
        <DashboardContent activeSection={activeSection} />
      </div>
    </div>
  );
}
/**  useEffect(()=>{
    try{
      const UserResponse=  axios.get("http://localhost:3000/update/profile", { responseType: 'blob', 
        withCredentials: true,
      headers:{
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
      });
      setUserData(UserResponse)

    }
  catch{}
  }
) */