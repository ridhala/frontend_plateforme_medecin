import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { update } from '../../services/serviceshome/profilservice';
import { MedecinProfile } from '../../types/profilemedecin';


const ProfilMedecin = () => {
  const [stateprofil, setstateprofil]= useState(false);
  const [profileData, setProfileData] = useState<MedecinProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<MedecinProfile>({
    _id: "",
    nom: "",
    prenom: "",
    email: "",
    telephone_personnel: null,
    numero_licence:null,
    telephone_cabinet: null,
    adresse_cabinet: "",
    nom_specialite: "",
    photo_profil: ""
  }); 
   const [error, setError] = useState<string | null>(null);
 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setUserData({ ...userData, [e.target.name]: e.target.value });
        };
      
        const handleSubmit =async (e: React.FormEvent) => {
          e.preventDefault();
          try{
           const updateprofil= await update(userData);
           setProfileData(updateprofil)
console.log("succes" , userData)
          }
          catch (err) {
            console.log( "erreur d'update" ,userData)

          }
        }

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
      <div className="h-170 w-150 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          {/* Section Photo de profil */}
          <div className="md:w-1/3 p-8 flex flex-col items-center bg-gray-400">
            <div className="relative mb-6">
              {profileData?.photo_profil ? (
                <img
                  src={profileData.photo_profil}
                  alt="Photo de profil"
                  className="w-40 h-40 rounded-full object-cover border-8 border-white shadow-lg"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">Pas de photo</span>
                </div>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 ">
              {profileData?.prenom} {profileData?.nom}
            </h2>
            
              <p className="text-gray-500">{profileData?._id}</p>
            
          </div>

          <div className="md:w-2/3 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Informations du profil</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Nom complet</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">
                  {profileData?.prenom} {profileData?.nom}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Specialité</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">
                  {profileData?.nom_specialite}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{profileData?.email}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500">Téléphone Personnel</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{profileData?.telephone_personnel}</p>
              </div>

              {profileData?.telephone_cabinet && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Téléphone Cabinet</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{profileData.telephone_cabinet}</p>
                </div>
              )}

              <div className="pt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick={()=>setstateprofil(true)}>
                  Modifier le profil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    :(<form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
      <div className="flex flex-col">
        <label className="font-medium">Nom :</label>
        <input
          type="text"
          name="nom"
          value={userData.nom}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Prenom :</label>
        <input
          type="text"
          name="prenom"
          value={userData.prenom}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Email :</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Téléphone :</label>
        <input
          type="text"
          name="telephone_personnel"
          value={userData.telephone_personnel?.toString()|| ''}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Téléphone de cabinet :</label>
        <input
          type="text"
          name="telephone_cabinet"
          value={userData.telephone_cabinet?.toString()|| ""}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col">
        <label className="font-medium">Adresse cabinet:</label>
        <input
          type="text"
          name="adresse_cabinet"
          value={userData.adresse_cabinet}
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
    </form>
  )
  );
};

export default ProfilMedecin;