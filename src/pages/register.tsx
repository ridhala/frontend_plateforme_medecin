import React, { useState } from 'react';
// Définir l'interface pour les données du formulaire
interface DoctorFormData {
  CIN_medecin: string; // Numéro CIN (chaîne de caractères)
  nom: string; // Nom du médecin
  prenom: string; // Prénom du médecin
  numero_licence: string; // Numéro de licence (chaîne de caractères)
  specialite: string; // Spécialité du médecin
  email: string;
  telephone_personnel: string; // Téléphone personnel (chaîne de caractères)
  adresse_cabinet: string; // Adresse du cabinet
  telephone_cabinet: string; // Téléphone du cabinet (chaîne de caractères)
  password: string; // Mot de passe
  photo_profil: File | null; // Photo de profil (fichier)
}

function Register() {
  // Initialiser l'état du formulaire avec des valeurs par défaut
  const [formData, setFormData] = useState<DoctorFormData>({
  
    CIN_medecin: '',
    nom: '',
    prenom: '',
    numero_licence: '',
    specialite: '',
    email:'',
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
  const handleSubmit = async  (e: React.FormEvent) => {
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
            WebkitTextStroke: '1px black',
          }}
        >
          CREATE A DOCTOR ACCOUNT
        </h1>
      </div>

      {/* Conteneur principal centré */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white/80 p-8 rounded-lg shadow-lg">
        {/* Titre du formulaire */}
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-red-900">
          Sign up to your account
          
        </h2>

        {/* Formulaire d'inscription */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
         

          {/* CIN Médecin */}
          <div>
            <label htmlFor="CIN_medecin" className="block text-sm font-medium text-gray-900">
              CIN Médecin
            </label>
            <div className="mt-2">
              <input
                id="CIN_medecin"
                name="CIN_medecin"
                type="text"
                required
                autoComplete="off"
                value={formData.CIN_medecin}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Nom */}
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-900">
              Nom
            </label>
            <div className="mt-2">
              <input
                id="nom"
                name="nom"
                type="text"
                required
                autoComplete="off"
                value={formData.nom}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Prénom */}
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-900">
              Prénom
            </label>
            <div className="mt-2">
              <input
                id="prenom"
                name="prenom"
                type="text"
                required
                autoComplete="off"
                value={formData.prenom}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Numéro de Licence */}
          <div>
            <label htmlFor="numero_licence" className="block text-sm font-medium text-gray-900">
              Numéro de Licence
            </label>
            <div className="mt-2">
              <input
                id="numero_licence"
                name="numero_licence"
                type="text"
                required
                autoComplete="off"
                value={formData.numero_licence}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Spécialité */}
          <div>
            <label htmlFor="specialite" className="block text-sm font-medium text-gray-900">
              Spécialité
            </label>
            <div className="mt-2">
              <input
                id="specialite"
                name="specialite"
                type="text"
                required
                autoComplete="off"
                value={formData.specialite}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

 {/* email */}
 <div>
            <label htmlFor="specialite" className="block text-sm font-medium text-gray-900">
              email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="text"
                required
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>


          {/* Téléphone Personnel */}
          <div>
            <label htmlFor="telephone_personnel" className="block text-sm font-medium text-gray-900">
              Téléphone Personnel
            </label>
            <div className="mt-2">
              <input
                id="telephone_personnel"
                name="telephone_personnel"
                type="tel"
                required
                autoComplete="off"
                value={formData.telephone_personnel}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Adresse Cabinet */}
          <div>
            <label htmlFor="adresse_cabinet" className="block text-sm font-medium text-gray-900">
              Adresse Cabinet
            </label>
            <div className="mt-2">
              <input
                id="adresse_cabinet"
                name="adresse_cabinet"
                type="text"
                required
                autoComplete="off"
                value={formData.adresse_cabinet}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Téléphone Cabinet */}
          <div>
            <label htmlFor="telephone_cabinet" className="block text-sm font-medium text-gray-900">
              Téléphone Cabinet
            </label>
            <div className="mt-2">
              <input
                id="telephone_cabinet"
                name="telephone_cabinet"
                type="tel"
                required
                autoComplete="off"
                value={formData.telephone_cabinet}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Mot de Passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Mot de Passe
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

          {/* Photo de Profil */}
          <div>
            <label htmlFor="photo_profil" className="block text-sm font-medium text-gray-900">
              Photo de Profil
            </label>
            <div className="mt-2">
              <input
                id="photo_profil"
                name="photo_profil"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Bouton de Soumission */}
          <div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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