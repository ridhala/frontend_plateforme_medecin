// components/RecentPatientsTable.tsx
import React from 'react';

function RecentPatientsTable() {
  return (
    <div className="mb-6">
      {/* Titre */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Patients Récents</h3>
      {/* Tableau */}
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
  );
}

export default RecentPatientsTable;