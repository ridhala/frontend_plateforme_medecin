// components/StatisticsSection.tsx
import React from 'react';

function StatisticsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Carte 1 : Total Patients */}
      <div className="bg-teal-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-teal-700">Total Patients</h3>
        <p className="text-3xl font-bold text-teal-800 mt-2">125</p>
      </div>
      {/* Carte 2 : Rendez-vous Aujourd'hui */}
      <div className="bg-teal-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-teal-700">Rendez-vous Aujourd'hui</h3>
        <p className="text-3xl font-bold text-teal-800 mt-2">10</p>
      </div>
      {/* Carte 3 : Consultations Cette Semaine */}
      <div className="bg-teal-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-teal-700">Consultations Cette Semaine</h3>
        <p className="text-3xl font-bold text-teal-800 mt-2">25</p>
      </div>
    </div>
  );
}

export default StatisticsSection;