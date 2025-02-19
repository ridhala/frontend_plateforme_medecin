// components/RegisterContainer.tsx
import React, { useState } from 'react';
import InputField from '../login/InputField'; // Import the InputField component
import { registerDoctor } from '../../services/doctorService'; // Import the service for doctor registration
import { DoctorFormData } from '../../types/doctorregistertype'; // Import the DoctorFormData type

interface RegisterContainerProps {
  onRegisterSuccess: () => void; // Prop for handling successful registration
}

function RegisterContainer({ onRegisterSuccess }: RegisterContainerProps) {
  const [formData, setFormData] = useState<DoctorFormData>({
    CIN_medecin: '',
    nom: '',
    prenom: '',
    numero_licence: '',
    specialite: '',
    email: '',
    telephone_personnel: '',
    adresse_cabinet: '',
    telephone_cabinet: '',
    password: '',
    photo_profil: null,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file upload for profile photo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prevData: any) => ({
        ...prevData,
        photo_profil: null,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerDoctor(formData); // Call the backend service to register the doctor
      console.log('Inscription réussie:', formData);
      onRegisterSuccess(); // Call the onRegisterSuccess prop function
    } catch (error) {
      console.error('Échec de l\'inscription:', error);
      alert('Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <div className="bg-white/80 p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        CREATE A DOCTOR ACCOUNT
      </h2>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* CIN Médecin */}
        <InputField
          label="CIN Médecin"
          type="text"
          name="CIN_medecin"
          value={formData.CIN_medecin}
          onChange={handleChange}
          required
        />

        {/* Nom */}
        <InputField
          label="Nom"
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
        />

        {/* Prénom */}
        <InputField
          label="Prénom"
          type="text"
          name="prenom"
          value={formData.prenom}
          onChange={handleChange}
          required
        />

        {/* Numéro de Licence */}
        <InputField
          label="Numéro de Licence"
          type="text"
          name="numero_licence"
          value={formData.numero_licence}
          onChange={handleChange}
          required
        />

        {/* Spécialité */}
        <InputField
          label="Spécialité"
          type="text"
          name="specialite"
          value={formData.specialite}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Téléphone Personnel */}
        <InputField
          label="Téléphone Personnel"
          type="tel"
          name="telephone_personnel"
          value={formData.telephone_personnel}
          onChange={handleChange}
          required
        />

        {/* Adresse Cabinet */}
        <InputField
          label="Adresse Cabinet"
          type="text"
          name="adresse_cabinet"
          value={formData.adresse_cabinet}
          onChange={handleChange}
          required
        />

        {/* Téléphone Cabinet */}
        <InputField
          label="Téléphone Cabinet"
          type="tel"
          name="telephone_cabinet"
          value={formData.telephone_cabinet}
          onChange={handleChange}
          required
        />

        {/* Mot de Passe */}
        <InputField
          label="Mot de Passe"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* Photo de Profil */}
        <div>
          <label htmlFor="photo_profil" className="block text-sm font-medium text-gray-700">
            Photo de Profil
          </label>
          <input
            id="photo_profil"
            name="photo_profil"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterContainer;