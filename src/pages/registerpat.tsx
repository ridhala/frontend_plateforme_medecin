import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { HiUser } from 'react-icons/hi';

interface PatientData {
  cin_patient: number | '';
  nom_patient: string;
  prenom_patient: string;
  email: string;
  telephone: number | '';
  password: string;
  date_naissance: string;
  sex: string;
}

const RegisterPatient = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PatientData>({
    cin_patient: '',
    nom_patient: '',
    prenom_patient: '',
    email: '',
    telephone: '',
    password: '',
    date_naissance: '',
    sex: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === 'cin_patient' || name === 'telephone') {
      setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = (): string | null => {
    if (!formData.cin_patient) return "CIN is required";
    if (isNaN(formData.cin_patient)) return "CIN must be a number";
    if (!formData.nom_patient.trim()) return "Last name is required";
    if (!formData.prenom_patient.trim()) return "First name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Invalid email format";
    if (!formData.telephone) return "Phone number is required";
    if(!formData.sex) return"sex is required"
    if (isNaN(formData.telephone)) return "Phone must be a number";
    if (!formData.password) return "Password is required";
    if (formData.password.length < 8) return "Password must be at least 8 characters";
    if (!formData.date_naissance) return "Birth date is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response= await axios.post('http://localhost:3000/authpatient/register', {
        cin_patient: formData.cin_patient,
        nom_patient: formData.nom_patient,
        prenom_patient: formData.prenom_patient,
        email: formData.email,
        telephone: formData.telephone,
        password: formData.password,
        date_naissance: new Date(formData.date_naissance).toISOString(),
        sex: formData.sex
      });

      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 
               err.response?.data || 
               'Registration failed. Please try again.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h1>
          <h2 className='text-2xl font-bold'>Please check your email to verify your account.</h2>
          <p className='text-xl font-semibold'>You will be redirected to login page shortly...</p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative bg-no-repeat bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://university-sc.com/wp-content/uploads/2019/04/Memorial-Hermann-Header-background.jpg')`,
        minHeight: '100vh', // S'assure que la section couvre toute la fenêtre
      }}
    >
      <div className="flex justify-center items-center min-h-screen w-full px-8 py-8">
        <div className=" bg-white p-3 rounded-4xl shadow-xl w-full max-w-xl  ">
          
          {/* Left side registration form */}
          <div className="bg-gradient-to-r from-gray-200 to-blue-200 p-8  rounded-xl flex flex-col items-center justify-center relative z-10">
            {/* Formulaire d'inscription */}
            <div className='text-indigo-600 text-2xl font-bold mb-2'>
              <h1 className="flex items-center justify-center gap-3 mb-4">
              <HiUser className="text-indigo-600 text-3xl" />
            Register Patient</h1></div>
            <form onSubmit={handleSubmit} className="space-y-3 ">
            {error&& (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
              <p>{error}</p>
            </div>
          )}

              {/* CIN */}
              <div>
                <label htmlFor="cin_patient" className="block text-sm font-medium text-gray-900">
                  CIN :
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
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              {/* Nom */}
              <div>
                <label htmlFor="nom_patient" className="block text-sm font-medium text-gray-900">
                  Nom :
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
                  Prénom :
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
                  Date de naissance :
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
              
          



              {/* Téléphone */}
              <div>
                <label htmlFor="telephone" className="block text-sm font-medium text-gray-900">
                  Téléphone :
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

              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Email :
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
              <div>
  <label className=" block text-sm font-medium text-gray-900">
    Sex :
  </label>
  <div className="mt-1 flex space-x-4 flex justify-center items-center">
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
             
              {/* Mot de passe */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                 Password :
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
                 { isLoading ?(
                    <Loader2 className='h-6 w-6 animate-spin text-white text-semifont'/>
                  ): 
                 ( "Register")}
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

         
        </div>
      </div>
    </section>
  );
};

export default RegisterPatient;