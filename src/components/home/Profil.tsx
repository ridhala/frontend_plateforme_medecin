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
    telephone_cabinet: ""
  });

  const [stateprofil, setstateprofil] = useState(false);
  const [profileData, setProfileData] = useState<MedecinProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileData) return;

    // Créer un objet combiné qui garde les anciennes données si champ vide
    const formDataToSend = Object.keys(form).reduce((acc: any, key) => {
      acc[key] = form[key as keyof profileformData] !== "" && form[key as keyof profileformData] !== null
        ? form[key as keyof profileformData]
        : profileData[key as keyof MedecinProfile];
      return acc;
    }, {});
// Vérifier s'il y a une différence
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

  return (!stateprofil ?
    <div className="h-140 w-full mx-auto bg-gray-300 rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Dr {profileData?.prenom} {profileData?.nom}
            </h2>
            <br />
            {profileData?.photo_profil ? (
              <img
                src={profileData.photo_profil}
                alt="Photo de profil"
                className="w-50 h-50 rounded-full object-cover border-8 border-white shadow-lg"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Pas de photo</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-2/3 p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Informations du profil</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">Nom complet</label>
              <p className="mt-1 p-2 bg-gray-50 rounded">
                {profileData?.prenom} {profileData?.nom}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Specialité</label>
              <p className="mt-1 p-2 bg-gray-50 rounded">
                {profileData?.nom_specialite}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1 p-2 bg-gray-50 rounded">{profileData?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Téléphone Personnel</label>
              <p className="mt-1 p-2 bg-gray-50 rounded">{profileData?.telephone_personnel}</p>
            </div>
            {profileData?.telephone_cabinet && (
              <div>
                <label className="block text-sm font-medium text-gray-600">Téléphone Cabinet</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{profileData.telephone_cabinet}</p>
              </div>
            )}
            <div className="pt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={() => setstateprofil(true)}>
                Modifier le profil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    : (<form onSubmit={handleSubmit} className="space-y-2 text-gray-700">
      <div className="flex flex-col">
        <label className="font-medium">Nom :</label>
        <input
          type="text"
          name="nom"
          value={form.nom}
          placeholder={profileData?.nom}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Prenom :</label>
        <input
          type="text"
          name="prenom"
          value={form.prenom}
          placeholder={profileData?.prenom}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Email :</label>
        <input
          type="email"
          name="email"
          placeholder={profileData?.email}
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Téléphone :</label>
        <input
          type="text"
          name="telephone_personnel"
          value={form.telephone_personnel}
          placeholder={profileData?.telephone_personnel?.toString()}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Téléphone de cabinet :</label>
        <input
          type="number"
          name="telephone_cabinet"
          value={form.telephone_cabinet}
          placeholder={profileData?.telephone_cabinet?.toString()}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Adresse cabinet:</label>
        <input
          type="text"
          name="adresse_cabinet"
          placeholder={profileData?.adresse_cabinet}
          value={form.adresse_cabinet}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Sauvegarder
        </button>
        <button
          type="button"
          onClick={() => setstateprofil(false)}
          className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          Annuler
        </button>
      </div>
    </form>)
  );
};

export default ProfilMedecin;
