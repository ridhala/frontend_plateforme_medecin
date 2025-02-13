// components/QuickActions.tsx
import React from 'react';

function QuickActions() {
  return (
    <div>
      {/* Titre */}
      <h3 className="text-xl font-bold text-gray-800 mb-4">Actions Rapides</h3>
      {/* Boutons */}
      <div className="flex space-x-4">
        <button className="bg-teal-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-700">
          Ajouter Patient
        </button>
        <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">
          Planifier Rendez-vous
        </button>
      </div>
    </div>
  );
}

export default QuickActions;