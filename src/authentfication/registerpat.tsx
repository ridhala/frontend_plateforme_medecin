import React, { useState } from 'react';

// Définir l'interface pour les données du formulaire du patient
interface PatientFormData {
  id_patient: string; // Identifiant unique du patient
  CIN: string; // Numéro CIN (chaîne de caractères)
  nom_patient: string; // Nom du patient
  prénom_patient: string; // Prénom du patient
  password: string; // Mot de passe
  date_naissance: string; // Date de naissance (format YYYY-MM-DD)
  téléphone: string; // Numéro de téléphone (chaîne de caractères)
  adresse: string; // Adresse du patient
  email: string; // Email du patient
}

export default function RegisterPat() {
  // Initialiser l'état du formulaire avec des valeurs par défaut
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

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Ajouter votre logique d'enregistrement ici
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://img.freepik.com/premium-vector/medical-background-with-doctor-s-lab-white-coat-stethoscope_259139-1358.jpg?w=1380)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Conteneur pour le titre */}
      <div className="w-full text-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wide hover:text-blue-500 transition-colors duration-300 ease-in-out"
          style={{
            color: 'black',
          }}
        >
          CREATE A PATIENT ACCOUNT
        </h1>
      </div>

      {/* Conteneur principal centré */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <img
          alt="Your Company"
          src="https://i.pinimg.com/550x/7c/ea/0a/7cea0ad2b9054fb76972b3594d4e1261.jpg"
          className="mx-auto h-10 w-auto mb-6"
        />
        

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

          {/* Date de naissance */}
          <div>
            <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-900">
              Date de naissance
            </label>
            <div className="mt-2">
              <input
                id="date_naissance"
                name="date_naissance"
                type="date"
                required
                value={formData.date_naissance}
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

          {/* Adresse */}
          <div>
            <label htmlFor="adresse" className="block text-sm font-medium text-gray-900">
              Adresse
            </label>
            <div className="mt-2">
              <input
                id="adresse"
                name="adresse"
                type="text"
                required
                autoComplete="off"
                value={formData.adresse}
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
    </div>
  );
}