import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { getsecretaire, update } from '../../services/serviceshome/profilservice';
import { MedecinProfile } from '../../types/profilemedecin';
import { profileformData } from '../../types/doctorregistertype';
import { useNavigate } from 'react-router-dom';
import { Secretaire } from '../../types/secretairetype';
import { InfoField } from './infofield';

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
 const navigate = useNavigate();
  const [stateprofil, setstateprofil] = useState(false);
  const [profileData, setProfileData] = useState<MedecinProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const [secprofil, setsecprofil]=useState<Secretaire>()
// profil secretaire pour secretaire 
 useEffect(() => {
    const Profilesecretaire = async () => {
      try {
   const profil=  await getsecretaire()
       setsecprofil(profil)
      } catch (err) {
        console.error('Erreur:', err);
      } };
      Profilesecretaire()
  }, []);
 


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
  if (secprofil) return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header with profile icon */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
          <img
                src="https://static.vecteezy.com/system/resources/previews/014/809/732/non_2x/modeling-agent-female-line-icon-vector.jpg"
                className="w-16 h-full object-cover"
              />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Profil </h2>
            <p className="text-blue-100">Informations personnelles et professionnelles</p>
          </div>
        </div>
      </div>
  
      {/* Main Content */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Identité
              </h3>
              <InfoField label="Nom" value={secprofil.nom_secretaire} />
              <InfoField label="Prénom" value={secprofil.prenom_secretaire} />
              <InfoField label="CIN" value={secprofil.cin_secretaire?.toString() || 'Non spécifié'} />
            </div>
          </div>
  
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact
              </h3>
              <InfoField 
                label="Email" 
                value={secprofil.email} 
                isEmail 
                className="break-all"
              />
              <InfoField 
                label="Téléphone" 
                value={secprofil.telephone} 
                isPhone 
              />
            </div>          
          </div>
        </div>
  
      </div>
    </div>
  );
/// compte docteur


  return ( !stateprofil ? (
    <div className="max-w-6xl mx-auto my-8 bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="md:flex">
      {/* Doctor Profile Sidebar */}
      <div className="md:w-1/3 bg-gradient-to-b from-blue-50 to-blue-100 p-8 flex flex-col items-center">
        <div className="relative mb-6 w-full flex flex-col items-center">
          {/* Profile Photo */}
          {profileData?.photo_profil ? (
            <img
              src={profileData.photo_profil}
              alt={`Dr. ${profileData.prenom} ${profileData.nom}`}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl font-bold">
                {profileData?.prenom?.charAt(0)}{profileData?.nom?.charAt(0)}
              </span>
            </div>
          )}
          
          {/* Doctor Title */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Dr. {profileData?.prenom} {profileData?.nom}
            </h2>
            <div className="mt-2">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {profileData?.nom_specialite}
              </span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="mt-8 w-full space-y-3">
            <button 
              onClick={() => setstateprofil(true)}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Modifier le profil
            </button>
            
            <button 
              onClick={() => navigate("/home/secretaire")}
              className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              Espace Secrétaire
            </button>
          </div>
        </div>
      </div>
  
      {/* Doctor Information Main Content */}
      <div className="md:w-2/3 p-8">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Informations Professionnelles</h1>
         
        </div>
        
        {/* Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Informations Personnelles</h3>
            </div>
            <div className="space-y-4">
              <InfoField label="Nom complet" value={`${profileData?.prenom} ${profileData?.nom}`} />
              <InfoField label="Email" value={profileData?.email ? profileData?.email :""}  />
              <InfoField label="Téléphone personnel" value={profileData?.telephone_personnel ? profileData?.telephone_personnel?.toString():""} isPhone />
            </div>
          </div>
  
          {/* Practice Information */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-teal-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Informations du Cabinet</h3>
            </div>
            <div className="space-y-4">
              <InfoField label="Adresse" value={profileData?.adresse_cabinet || "Non renseignée"} />
              <InfoField label="Téléphone de cabinet" value={profileData?.telephone_cabinet?.toString() || "Non renseigné"} isPhone />
                         </div>
          </div>
  
          {/* About Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">À Propos</h3>
            </div>
            <div className="prose max-w-none text-gray-700">
              {profileData?.bio ? (
                <p className="whitespace-pre-line">{profileData.bio}</p>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>Le Dr. n'a pas encore ajouté de description.</p>
                </div>
              )}
            </div>
          </div>
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
    
  )


);
 
};
// Reusable InfoField component

export default ProfilMedecin;