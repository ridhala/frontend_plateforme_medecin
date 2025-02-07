import { useState } from 'react';

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
        photo_profil:null,
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create a Doctor Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Médecin */}
          <div>
            <label htmlFor="id_medecin" className="block text-sm font-medium text-gray-900">
              ID Médecin
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="id_medecin"
                id="id_medecin"
                autoComplete="off"
                required
                value={formData.id_medecin}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* CIN Médecin */}
          <div>
            <label htmlFor="CIN_medecin" className="block text-sm font-medium text-gray-900">
              CIN Médecin
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="CIN_medecin"
                id="CIN_medecin"
                autoComplete="off"
                required
                value={formData.CIN_medecin}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="nom"
                id="nom"
                autoComplete="family-name"
                required
                value={formData.nom}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="prenom"
                id="prenom"
                autoComplete="given-name"
                required
                value={formData.prenom}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="numero_licence"
                id="numero_licence"
                autoComplete="off"
                required
                value={formData.numero_licence}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="specialite"
                id="specialite"
                autoComplete="off"
                required
                value={formData.specialite}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="telephone_personnel"
                id="telephone_personnel"
                autoComplete="tel"
                required
                value={formData.telephone_personnel}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="adresse_cabinet"
                id="adresse_cabinet"
                autoComplete="street-address"
                required
                value={formData.adresse_cabinet}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="text"
                name="telephone_cabinet"
                id="telephone_cabinet"
                autoComplete="tel"
                required
                value={formData.telephone_cabinet}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
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
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Photo de Profil (Upload Image) */}
          <div>
            <label htmlFor="photo_profil" className="block text-sm font-medium text-gray-900">
              Photo de Profil
            </label>
            <div className="mt-2">
              <input
                type="file"
                name="photo_profil"
                id="photo_profil"
                accept="image/*" // Accept only image files
                onChange={handleFileChange}
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Bouton de Soumission */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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