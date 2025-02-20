// pages/Accueil.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour naviguer vers d'autres pages


function Accueil() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
    

      {/* Bouton Connexion centré en bas de la page */}
      <div className="mt-auto flex justify-center items-center py-6 bg-white shadow-lg">
        <Link
          to="/login"
          className="px-6 py-3 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          Connexion
        </Link>
      </div>
    </div>
  );
}

export default Accueil;