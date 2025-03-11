import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Patientform } from '../types/patienttype';
import { registerPatient } from '../services/patientService';
export default function RegisterPat() {
  const [formData, setFormData] = useState<Patientform>({
   
    cin_patient: '',
    nom_patient: '',
    prenom_patient: '',
    date_naissance: "",
    sex: '',
    email: '',
    telephone: '',
    
     password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      console.log("Inscription réussie:", formData);

    if(await registerPatient(formData)){
      await navigate('/login');
    }
}

catch (error) {
  console.error("Échec de l'inscription:", error);

  // Display the specific error message from the backend
  if (error instanceof Error) {
    setErrorMessage(`Échec de l'inscription: ${error.message}`);
  } else {
    setErrorMessage("Une erreur inconnue est survenue lors de l'inscription.");
  }
}

  };

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://university-sc.com/wp-content/uploads/2019/04/Memorial-Hermann-Header-background.jpg')`,
        minHeight: '100vh', // S'assure que la section couvre toute la fenêtre
      }}
    >
      <div className="flex justify-center items-center min-h-screen w-full">
        <div className="relative w-full max-w-3xl h-[835px] bg-white bg-opacity-100 backdrop-blur-lg rounded-lg shadow-lg flex overflow-hidden mx-auto">
          
          {/* Left side registration form */}
          <div className="w-1/2 p-12 bg-gray-200 flex flex-col items-center justify-center relative z-10">
            {/* Formulaire d'inscription */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-1">
            {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}

              {/* CIN */}
              <div>
                <label htmlFor="cin_patient" className="block text-sm font-medium text-gray-900">
                  CIN 
                </label>
                <div className="mt-1">
                  <input
                    id="cin_patient"
                    name="cin_patient"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.cin_patient}
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
                <div className="mt-1">
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
                <label htmlFor="prenom_patient" className="block text-sm font-medium text-gray-900">
                  Prénom
                </label>
                <div className="mt-1">
                  <input
                    id="prenom_patient"
                    name="prenom_patient"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.prenom_patient}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
          {/*DATE*/}
          <div>
                <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-900">
                  Date de naissance
                </label>
                <div className="mt-1">
                <input
  id="date_naissance"
  name="date_naissance"// Use "date" instead of "Date"
  required
  type='Date'
  autoComplete="off"
  value={formData.date_naissance} // Convert Date to string
  onChange={handleChange}
  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
/>
                </div>
              </div>
              
            <div>
  <label className="block text-sm font-medium text-gray-900">
    Sex
  </label>
  <div className="mt-1 flex space-x-4">
    {/* Checkbox for Male */}
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="sex"
        value="M"
        checked={formData.sex === 'M'}
        onChange={handleChange}
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
      <span className="ml-2 text-gray-700">Male</span>
    </label>

    {/* Checkbox for Female */}
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        name="sex"
        value="F"
        checked={formData.sex === 'F'}
        onChange={handleChange}
        className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
      />
      <span className="ml-2 text-gray-700">Female</span>
    </label>
  </div>
</div>



              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-900">
                  Téléphone
                </label>
                <div className="mt-1">
                  <input
                    id="telephone"
                    name="telephone"
                    type="text"
                    required
                    autoComplete="off"
                    value={formData.telephone}
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
                <div className="mt-1">
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
             
              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                 Password
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
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign in
              </a>
            </p>
          </div>

          {/* Right side sign up section with light gray background */}
          <div className="w-1/2 p-12 bg-gradient-to-r from-white to-blue-300 text-white flex flex-col items-center justify-center relative">
            
            <p className="text-lg mb-6 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Create a Patient Account</h2>
            </p>
            <Link
              to="/login"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
