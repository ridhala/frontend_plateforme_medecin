import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { update } from '../../services/serviceshome/profilservice';
import { MedecinProfile } from '../../types/profilemedecin';
import { profileformData } from '../../types/doctorregistertype';

const ProfilMedecin = () => {
  const [form, setForm] = useState<profileformData>({
    nom: "",
    prenom: "",
    email: "",
    telephone_personnel: "",
    adresse_cabinet: "",
    telephone_cabinet: "",
    bio: ""
  });

  const [stateprofil, setstateprofil] = useState(false);
  const [profileData, setProfileData] = useState<MedecinProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileData) return;

    const formDataToSend = Object.keys(form).reduce((acc: any, key) => {
      acc[key] = form[key as keyof profileformData] !== "" && form[key as keyof profileformData] !== null
        ? form[key as keyof profileformData]
        : profileData[key as keyof MedecinProfile];
      return acc;
    }, {});

    const isChanged = Object.keys(form).some((key) => {
      const formValue = form[key as keyof profileformData];
      const existingValue = profileData[key as keyof MedecinProfile];
      return formValue !== "" && formValue?.toString() !== existingValue?.toString();
    });

    try {
      if(isChanged){
        const updateprofil = await update(formDataToSend);
        if (updateprofil) {
          console.log("success", updateprofil);
          setProfileData(updateprofil);
          setstateprofil(false);
          window.location.reload();
        }
      }
    } catch (err) {
      console.log("erreur d'update", err);
    }
  };

  useEffect(() => {
    const ProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/update/profile', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        setProfileData(response.data.utilisateur);
        // Initialize form with existing bio if available
        if (response.data.utilisateur?.bio) {
          setForm(prev => ({...prev, bio: response.data.utilisateur.bio}));
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Erreur lors du chargement du profil');
      } finally {
        setIsLoading(false);
      }
    };

    ProfileData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        <span className="ml-3 text-lg">Chargement du profil...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 ">
          <p className="font-bold">Erreur</p>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (!stateprofil ? (
    <div className="max-w-4xl mx-auto my-8 bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        {/* Doctor Photo Section */}
        <div className="md:w-1/3 bg-gradient-to-b from-blue-50 to-blue-100 p-8 flex flex-col items-center">
          <div className="relative mb-6 w-full flex flex-col items-center">
            {profileData?.photo_profil ? (
              <img
                src={profileData.photo_profil}
                alt="Photo de profil"
                className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-blue-200 flex items-center justify-center shadow-xl">
                <span className="text-blue-600 text-xl font-bold">
                  {profileData?.prenom?.charAt(0)}{profileData?.nom?.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Dr. {profileData?.prenom} {profileData?.nom}
              </h2>
              <p className="text-blue-600 font-medium mt-2">{profileData?.nom_specialite}</p>
              
              <div className="mt-6">
                <button 
                  onClick={() => setstateprofil(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Modifier le profil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Information Section */}
        <div className="md:w-2/3 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">Informations du profil</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Informations personnelles</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-400">Nom complet</p>
                  <p className="text-gray-700 font-medium">
                    {profileData?.prenom} {profileData?.nom}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Email</p>
                  <p className="text-gray-700 font-medium">{profileData?.email}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Téléphone</p>
                  <p className="text-gray-700 font-medium">{profileData?.telephone_personnel}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Informations du cabinet</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-400">Adresse</p>
                  <p className="text-gray-700 font-medium">
                    {profileData?.adresse_cabinet || "Non renseignée"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-400">Téléphone</p>
                  <p className="text-gray-700 font-medium">
                    {profileData?.telephone_cabinet || "Non renseigné"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">À propos</h3>
            <p className="text-gray-700 whitespace-pre-line">
              {profileData?.bio || "Le Dr. n'a pas encore ajouté de description."}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-2xl mx-auto my-8 bg-white rounded-xl shadow-lg overflow-hidden p-6">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Modifier le profil</h2>
        <button
          onClick={() => setstateprofil(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              name="nom"
              value={form.nom}
              placeholder={profileData?.nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input
              type="text"
              name="prenom"
              value={form.prenom}
              placeholder={profileData?.prenom}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder={profileData?.email}
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone personnel</label>
            <input
              type="text"
              name="telephone_personnel"
              value={form.telephone_personnel}
              placeholder={profileData?.telephone_personnel?.toString()}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone cabinet</label>
            <input
              type="number"
              name="telephone_cabinet"
              value={form.telephone_cabinet}
              placeholder={profileData?.telephone_cabinet?.toString()}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse cabinet</label>
            <input
              type="text"
              name="adresse_cabinet"
              placeholder={profileData?.adresse_cabinet}
              value={form.adresse_cabinet}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Biographie</label>
            <textarea
              name="bio"
              placeholder="Décrivez votre parcours, vos spécialités, etc."
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => setstateprofil(false)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  ));
};

export default ProfilMedecin;