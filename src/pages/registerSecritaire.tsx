import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SecretaryFormData {
  id_secretaire: string;
  CIN: string;
  nom_secretaire: string;
  prénom_secretaire: string;
  password: string;
  date_naissance: string;
  téléphone: string;
  adresse: string;
  email: string;
}

export default function RegisterSecretaire() {
  const [formData, setFormData] = useState<SecretaryFormData>({
    id_secretaire: '',
    CIN: '',
    nom_secretaire: '',
    prénom_secretaire: '',
    password: '',
    date_naissance: '',
    téléphone: '',
    adresse: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Logique d'enregistrement
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      backgroundImage: `url('https://university-sc.com/wp-content/uploads/2019/04/Memorial-Hermann-Header-background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="w-full max-w-6xl flex rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 bg-white bg-opacity-90 backdrop-blur-sm p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Inscription Secrétaire</h1>
            <p className="text-gray-600 mt-2">Remplissez le formulaire pour créer un compte</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ID Secrétaire */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Secrétaire</label>
              <input
                name="id_secretaire"
                value={formData.id_secretaire}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* CIN */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
              <input
                name="CIN"
                value={formData.CIN}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Date de naissance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
              <input
                type="date"
                name="date_naissance"
                value={formData.date_naissance}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                name="nom_secretaire"
                value={formData.nom_secretaire}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Prénom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                name="prénom_secretaire"
                value={formData.prénom_secretaire}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
              <input
                name="téléphone"
                value={formData.téléphone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Adresse */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
              <input
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-md"
              >
                S'inscrire
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Vous avez déjà un compte?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Connectez-vous
            </Link>
          </div>
        </div>

        {/* Right Side - Visual */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-800 to-blue-600 flex-col items-center justify-center p-12 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-4xl font-bold mb-6">Créer un compte pour la secritaire</h1>
            <p className="text-lg mb-8 opacity-90">
              Enregistrez-vous...
            </p>
            <div className="bg-gray-600 bg-opacity-20 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">Pourquoi s'inscrire?</h3>
              <ul className="space-y-2 text-left text-sm">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accès sécurisé aux dossiers
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gestion des rendez-vous
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Interface intuitive
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}