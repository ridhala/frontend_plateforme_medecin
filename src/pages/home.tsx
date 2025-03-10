import React, { useState } from 'react';
import Sidebar from '../components/home/Sidebar';
import DashboardContent from '../components/home/DashboardContent';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} />
      <DashboardContent activeSection={activeSection} />
    </div>
  );
}