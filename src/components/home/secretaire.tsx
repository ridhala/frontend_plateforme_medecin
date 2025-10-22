import React, { useEffect, useState } from 'react';
import { createsecreteaire, fetchprofilmedecin, profilSecretaire, updatesecretaires } from '../../services/serviceshome/profilservice';
import { Secretaire, Secretaires } from '../../types/secretairetype';
import { MedecinProfilesec } from '../../types/profilemedecin';
import { useNavigate } from 'react-router-dom';
import { InfoField } from './infofield';

const SecretaireForm = () => {
  const [profileData, setProfileData] = useState<MedecinProfilesec | null>(null);
  const [secretaire, setSecretaire] = useState<Secretaire | null>(null);
  const [updatedsecretaire, setupdatedsecretaire] = useState<Secretaire>();
  const [formprofile, setFormprofile] = useState<Secretaire>();
  const navigate = useNavigate();
  const [updatesecretaire, setupdate] = useState(false);

  const [loadingSecretary, setLoadingSecretary] = useState(true);
  const [form, setForm] = useState<Secretaires>({
    cin_secretaire: null,
    nom_secretaire: '',
    prenom_secretaire: '',
    email: '',
    telephone: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
console.log(secretaire)
  useEffect(() => {
    const ProfileData = async () => {
      try {
        const profil = await fetchprofilmedecin();
        setProfileData(profil);
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoadingSecretary(false);
      }
    };
    ProfileData();
  }, []);

  useEffect(() => {
    const profilsecretaire = async () => { 
      try {
        const secretaire = await profilSecretaire();
        setFormprofile(secretaire);
        setLoadingSecretary(false);
      } catch (err) {
        console.error(err);
      }
    };
    profilsecretaire();
  }, []);


  const updateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {if(formprofile?._id && updatedsecretaire ){
      const secretaire = await updatesecretaires(formprofile?._id, updatedsecretaire);
      setFormprofile(secretaire);
      setMessage('Secrétaire updated avec succès !');
      // Refresh secretary data after update
      const updatedSecretaires = await profilSecretaire();
      setFormprofile(updatedSecretaires);}
    } catch (error) {
      if (error instanceof Error) {
        setMessage(` probleme:  ${error.message}`);
      }
      
    } finally {
      setIsSubmitting(false);
      setupdate(false);
    }
  };
  

  const updateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setupdatedsecretaire(prev => ({
      ...(prev as Secretaire), // Assertion
      [name]: name === 'cin_secretaire' ? Number(value) : value
    }));
  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: name === 'cin_secretaire' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const secretaire = await createsecreteaire(form);
      setSecretaire(secretaire);
      setMessage('Secrétaire créée avec succès !');
      // Refresh secretary data after creation
      const updatedSecretaire = await profilSecretaire();
      setFormprofile(updatedSecretaire);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(` probleme:  ${error.message}`);
      }
      
    
    } finally {
      setIsSubmitting(false);
    }
  };

  if (updatesecretaire) return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier le Profil</h2>
      
      <form onSubmit={updateSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">CIN</label>
          <input
            type="number"
            name="cin_secretaire"
            value={updatedsecretaire?.cin_secretaire?.toString()}

           placeholder={formprofile?.cin_secretaire?.toString()}
            onChange={updateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            
          />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom_secretaire"
              value={updatedsecretaire?.nom_secretaire}
              placeholder={formprofile?.nom_secretaire}
              onChange={updateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom_secretaire"
              value={updatedsecretaire?.prenom_secretaire}

              placeholder={formprofile?.prenom_secretaire}
              onChange={updateChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              
            />
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={updatedsecretaire?.email}

            placeholder={formprofile?.email}
            onChange={updateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input
            type="tel"
            name="telephone"
            value={updatedsecretaire?.telephone}
            placeholder={formprofile?.telephone}
            onChange={updateChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            
          />
        </div>
  
      
  
  
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => setupdate(false)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="max-w-220 mx-auto p-2 bg-white rounded-xl shadow-lg">
      <button 
        onClick={() => navigate(-1)}
        className="mb-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center shadow-sm"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Retour
      </button>

      {loadingSecretary ? (
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Chargement du profil...</p>
          </div>
        </div>
      ) : profileData?.cin_secretaire || formprofile ? (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Profil de la Secrétaire</h2>
                <p className="text-gray-500">Informations personnelles et de contact</p>
              </div>
              {formprofile && (
                <div className="mt-4 md:mt-0">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Compte actif
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Identité
                </h3>
                <InfoField label="Nom" value={formprofile?.nom_secretaire || 'Non renseigné'} />
                <InfoField label="Prénom" value={formprofile?.prenom_secretaire || 'Non renseigné'} />
                <InfoField label="CIN" value={formprofile?.cin_secretaire?.toString() || 'Non renseigné'} />
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </h3>
                <InfoField 
                  label="Email" 
                  value={formprofile?.email || 'Non renseigné'} 
                  isEmail 
                />
                <InfoField 
                  label="Téléphone" 
                  value={formprofile?.telephone || 'Non renseigné'} 
                  isPhone 
                />  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
               
                <button className="mt-3 sm:mt-0 px-4 py-2 bg-gray-200 text-teal-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={()=>{setupdate(true)}}
                >
                 Modifier compte
                </button>
              </div>
              </div>
             
            
            </div>

            <div className="mt-6 bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Sécurité du compte
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Mot de passe</p>
                  <p className="text-gray-700">••••••••</p>
                </div>
                <button className="mt-3 sm:mt-0 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                  Changer le mot de passe
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Créer un compte secrétaire</h2>
            <p className="text-gray-600 mb-6">Remplissez les informations pour créer un compte pour votre secrétaire</p>

            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('succès') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CIN*</label>
                  <input
                    type="number"
                    name="cin_secretaire"
                    value={form.cin_secretaire?.toString() || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Numéro CIN"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom*</label>
                  <input
                    type="text"
                    name="nom_secretaire"
                    value={form.nom_secretaire}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Nom de famille"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prénom*</label>
                  <input
                    type="text"
                    name="prenom_secretaire"
                    value={form.prenom_secretaire}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="Prénom"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone*</label>
                  <input
                    type="tel"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="+212 6 00 00 00 00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe*</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                    placeholder="••••••••"
                  />
                  <p className="mt-1 text-xs text-gray-500">Minimum 8 caractères</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      Créer le compte secrétaire
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable InfoField component

export default SecretaireForm;