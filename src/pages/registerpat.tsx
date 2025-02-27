import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Définir l'interface pour les données du formulaire du patient
interface PatientFormData {
  id_patient: string;
  CIN: string;
  nom_patient: string;
  prénom_patient: string;
  password: string;
  date_naissance: string;
  téléphone: string;
  adresse: string;
  email: string;
}

export default function RegisterPat() {
  const [formData, setFormData] = useState<PatientFormData>({
    id_patient: '',
    CIN: '',
    nom_patient: '',
    prénom_patient: '',
    password: '',
    date_naissance: '',
    téléphone: '',
    adresse: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Ajouter votre logique d'enregistrement ici
  };

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://university-sc.com/wp-content/uploads/2019/04/Memorial-Hermann-Header-background.jpg')`,
        minHeight: '100vh', // S'assure que la section couvre toute la fenêtre
      }}
    >
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="relative w-full max-w-4xl h-[820px] bg-white bg-opacity-100 backdrop-blur-lg rounded-lg shadow-lg flex overflow-hidden mx-auto">
          
          {/* Left side registration form */}
          <div className="w-1/2 p-12 bg-gray-200 flex flex-col items-center justify-center relative z-10">
            {/* Formulaire d'inscription */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* ID Patient */}
              <div>
                <label htmlFor="id_patient" className="block text-sm font-medium text-gray-900">
                  ID Patient
                </label>
                <div className="mt-2">
                  <input
                    id="id_patient"
                    name="id_patient"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.id_patient}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* CIN */}
              <div>
                <label htmlFor="CIN" className="block text-sm font-medium text-gray-900">
                  CIN
                </label>
                <div className="mt-2">
                  <input
                    id="CIN"
                    name="CIN"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.CIN}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Nom */}
              <div>
                <label htmlFor="nom_patient" className="block text-sm font-medium text-gray-900">
                  Nom
                </label>
                <div className="mt-2">
                  <input
                    id="nom_patient"
                    name="nom_patient"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.nom_patient}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Prénom */}
              <div>
                <label htmlFor="prénom_patient" className="block text-sm font-medium text-gray-900">
                  Prénom
                </label>
                <div className="mt-2">
                  <input
                    id="prénom_patient"
                    name="prénom_patient"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.prénom_patient}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Mot de passe
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label htmlFor="téléphone" className="block text-sm font-medium text-gray-900">
                  Téléphone
                </label>
                <div className="mt-2">
                  <input
                    id="téléphone"
                    name="téléphone"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.téléphone}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>

            {/* Lien pour retourner à la page de connexion */}
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>

          {/* Right side sign up section with light gray background */}
          <div className="w-1/2 p-12 bg-gradient-to-r from-gray-400 to-gray-600 text-white flex flex-col items-center justify-center relative">
            
            <p className="text-lg mb-6 text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Create a Patient Account</h2>
            </p>
            <Link
              to="/login"
              className="bg-white text-red-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
