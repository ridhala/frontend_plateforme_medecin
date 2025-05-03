import React, { useEffect, useState } from 'react';
import { createsecreteaire, fetchprofilmedecin, profilSecretaire } from '../../services/serviceshome/profilservice';
import { Secretaire } from '../../types/secretairetype';
import {  MedecinProfilesec } from '../../types/profilemedecin';
import { useNavigate } from 'react-router-dom';



const SecretaireForm = () => {
    const [profileData, setProfileData] = useState<MedecinProfilesec | null>(null);
  
  const [secretaire, setSecretaire] = useState<Secretaire | null>(null);
  const [formprofile, setFormprofile] = useState<Secretaire>()
  const navigate = useNavigate();
  const [loadingSecretary, setLoadingSecretary] = useState(true);
  const [form, setForm] = useState<Secretaire>({
    cin_secretaire: null,
    nom_secretaire: '',
    prenom_secretaire: '',
    email: '',
    telephone: '',
    password:""
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ProfileData = async () => {
      try {
   const profil=  await fetchprofilmedecin()
       setProfileData(profil)
      } catch (err) {
        console.error('Erreur:', err);
      } finally {
        setLoadingSecretary(false)
      }};
    ProfileData();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === 'cin_secretaire' ? Number(value) : value,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const secretaire= await createsecreteaire(form)
      setSecretaire(secretaire);
 setIsSubmitting(false);
      setMessage('Secrétaire crée avec succès !');
     
    } catch (err) {
      console.error(err);
      setMessage("Erreur lors de la création de la secrétaire.");
    } finally {
      setIsSubmitting(false);
    }
  };
useEffect(()=>{
  const profilsecretaire=async ()=>{ 
    try{
const secretaire= await profilSecretaire ()
setFormprofile(secretaire)
console.log(secretaire)
setLoadingSecretary(false)

    }
    catch (err) {
      console.error(err);}{
      
    }}
    profilsecretaire();
}, [])

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-200 rounded-xl shadow-lg">
 <button 
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer transition flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Retour
      </button>
      {loadingSecretary && (
            <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Chargement du profil...</p>
              </div>
            </div>
          )}
{profileData?.cin_secretaire ? (

  <div>
    { (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">Profil de la Secrétaire</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-base">
          <div>
            <p className="font-semibold">Nom :</p>
            <p>{formprofile?.nom_secretaire || 'Non renseigné'}</p>
          </div>

          <div>
            <p className="font-semibold">Prénom :</p>
            <p>{formprofile?.prenom_secretaire || 'Non renseigné'}</p>
          </div>

          <div>
            <p className="font-semibold">CIN :</p>
            <p>{formprofile?.cin_secretaire || 'Non renseigné'}</p>
          </div>

          <div>
            <p className="font-semibold">Email :</p>
            <p>{formprofile?.email || 'Non renseigné'}</p>
          </div>

          <div>
            <p className="font-semibold">Téléphone :</p>
            <p>{formprofile?.telephone || 'Non renseigné'}</p>
          </div>
        </div>
      </div>
    )}
  </div>
) : (


        <form onSubmit={handleSubmit} className="space-y-2">
          <h2 className="text-xl font-bold mb-4">Créer un compte pour votre secrétaire</h2>
        <div>       {message && (
  <p className="mt-3 text-sm text-gray-800 bg-blue-100 border-l-4 border-blue-600 p-3 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
    {message}
  </p>
)}</div>
          <div>
            <label className="block text-sm font-medium text-gray-700">CIN</label>
            <input
              type="number"
              name="cin_secretaire"
              value={form.cin_secretaire?.toString()}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input
              type="text"
              name="nom_secretaire"
              value={form.nom_secretaire}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prénom</label>
            <input
              type="text"
              name="prenom_secretaire"
              value={form.prenom_secretaire}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone</label>
            <input
              type="text"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Enregistrement...' : 'Créer la secrétaire'}
          </button>
   
        </form>
      )}
    </div>
   
  );
};

export default SecretaireForm;
