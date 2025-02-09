import React, { useState } from 'react';

// Définir l'interface pour les données du formulaire
interface DoctorFormData {
  id_medecin: string; // Identifiant unique du médecin
  CIN_medecin: string; // Numéro CIN (chaîne de caractères)
  nom: string; // Nom du médecin
  prenom: string; // Prénom du médecin
  numero_licence: string; // Numéro de licence (chaîne de caractères)
  specialite: string; // Spécialité du médecin
  telephone_personnel: string; // Téléphone personnel (chaîne de caractères)
  adresse_cabinet: string; // Adresse du cabinet
  telephone_cabinet: string; // Téléphone du cabinet (chaîne de caractères)
  password: string; // Mot de passe
  photo_profil: File | null; // Photo de profil (fichier)
}

function Register() {
  // Initialiser l'état du formulaire avec des valeurs par défaut
  const [formData, setFormData] = useState<DoctorFormData>({
    id_medecin: '',
    CIN_medecin: '',
    nom: '',
    prenom: '',
    numero_licence: '',
    specialite: '',
    telephone_personnel: '',
    adresse_cabinet: '',
    telephone_cabinet: '',
    password: '',
    photo_profil: null,
  });

  // Gérer les changements dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gérer le changement de fichier pour la photo de profil
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        photo_profil: null,
      }));
    }
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
          'url(https://img.freepik.com/free-photo/top-view-medical-desk-with-copy-space_23-2148519718.jpg?t=st=1739057668~exp=1739061268~hmac=9829aee93e03dbef17b595b3bd1f7faf4d68ad5b27ec19164cba9162411e1dcc&w=1060)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      
      {/* Conteneur pour le titre */}
      <div className="w-full text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-red">
          CREATE A DOCTOR ACCOUNT
        </h1>
      </div>

      {/* Conteneur principal centré */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white/80 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ID Médecin */}
          <div>
            <label htmlFor="id_medecin" className="block text-sm font-medium text-gray-700">
              ID Médecin
            </label>
            <div className="mt-1">
              <input
                id="id_medecin"
                name="id_medecin"
                type="text"
                required
                autoComplete="off"
                value={formData.id_medecin}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* CIN Médecin */}
          <div>
            <label htmlFor="CIN_medecin" className="block text-sm font-medium text-gray-700">
              CIN Médecin
            </label>
            <div className="mt-1">
              <input
                id="CIN_medecin"
                name="CIN_medecin"
                type="text"
                required
                autoComplete="off"
                value={formData.CIN_medecin}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <div className="mt-1">
              <input
                id="nom"
                name="nom"
                type="text"
                required
                autoComplete="off"
                value={formData.nom}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Prénom */}
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <div className="mt-1">
              <input
                id="prenom"
                name="prenom"
                type="text"
                required
                autoComplete="off"
                value={formData.prenom}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Numéro de Licence */}
          <div>
            <label htmlFor="numero_licence" className="block text-sm font-medium text-gray-700">
              Numéro de Licence
            </label>
            <div className="mt-1">
              <input
                id="numero_licence"
                name="numero_licence"
                type="text"
                required
                autoComplete="off"
                value={formData.numero_licence}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Spécialité */}
          <div>
            <label htmlFor="specialite" className="block text-sm font-medium text-gray-700">
              Spécialité
            </label>
            <div className="mt-1">
              <input
                id="specialite"
                name="specialite"
                type="text"
                required
                autoComplete="off"
                value={formData.specialite}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Téléphone Personnel */}
          <div>
            <label htmlFor="telephone_personnel" className="block text-sm font-medium text-gray-700">
              Téléphone Personnel
            </label>
            <div className="mt-1">
              <input
                id="telephone_personnel"
                name="telephone_personnel"
                type="tel"
                required
                autoComplete="off"
                value={formData.telephone_personnel}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Adresse Cabinet */}
          <div>
            <label htmlFor="adresse_cabinet" className="block text-sm font-medium text-gray-700">
              Adresse Cabinet
            </label>
            <div className="mt-1">
              <input
                id="adresse_cabinet"
                name="adresse_cabinet"
                type="text"
                required
                autoComplete="off"
                value={formData.adresse_cabinet}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Téléphone Cabinet */}
          <div>
            <label htmlFor="telephone_cabinet" className="block text-sm font-medium text-gray-700">
              Téléphone Cabinet
            </label>
            <div className="mt-1">
              <input
                id="telephone_cabinet"
                name="telephone_cabinet"
                type="tel"
                required
                autoComplete="off"
                value={formData.telephone_cabinet}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Mot de Passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de Passe
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Photo de Profil */}
          <div>
            <label htmlFor="photo_profil" className="block text-sm font-medium text-gray-700">
              Photo de Profil
            </label>
            <div className="mt-1">
              <input
                id="photo_profil"
                name="photo_profil"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
              />
            </div>
          </div>

          {/* Bouton de Soumission */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;