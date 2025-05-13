import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SecretaryFormData {
  id_secretaire: string;
  CIN: string;
  nom_secretaire: string;
  prénom_secretaire: string;
  password: string;
  téléphone: string;
  email: string;
}

export default function RegisterSecretaire() {
  const [formData, setFormData] = useState<SecretaryFormData>({
    id_secretaire: '',
    CIN: '',
    nom_secretaire: '',
    prénom_secretaire: '',
    password: '',
    téléphone: '',
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
      <div className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Inscription Secrétaire</h1>
            <p className="text-gray-600 mt-1 text-sm">Remplissez le formulaire pour créer un compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {/* ID Secrétaire */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ID Secrétaire</label>
                <input
                  name="id_secretaire"
                  value={formData.id_secretaire}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Nom */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                  <input
                    name="nom_secretaire"
                    value={formData.nom_secretaire}
                    onChange={handleChange}
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full px-3 py-2 text-sm rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 shadow-sm"
              >
                S'inscrire
              </button>
            </div>
          </form>

          <div className="mt-4 text-center text-xs text-gray-600">
            Vous avez déjà un compte?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Connectez-vous
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}