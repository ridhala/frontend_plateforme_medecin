import React, { useState } from "react";
import { FaUserMd } from "react-icons/fa";
import InputField from "../../components/register/RegisterInputField";
import { registerDoctor } from "../../services/authentification/registerdoctorService";
import { DoctorFormData } from "../../types/doctorregistertype";
import { Loader2 } from "lucide-react";
import axios from "axios";

interface RegisterContainerProps {
  onRegisterSuccess: () => void;
}

function RegisterContainer({ onRegisterSuccess }: RegisterContainerProps) {
  const [formData, setFormData] = useState<DoctorFormData>({
    cin_medecin: "",
    nom: "",
    prenom: "",
    numero_licence: "",
    nom_specialite: "",
    email: "",
    telephone_personnel: "",
    adresse_cabinet: "",
    telephone_cabinet: "",
    password: "",
    photo_profil: null,
  });

  const specialtyOptions = JSON.parse(import.meta.env.VITE_SPECIALTY_NAMES || "[]");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        photo_profil: file,
      });
    }
  };

  const validateForm = () => {
    if (!/^\d{8}$/.test(formData.cin_medecin)) {
      setErrorMessage("Le CIN doit contenir exactement 8 chiffres.");
      return false;
    }

    if (!formData.nom.trim() || !formData.prenom.trim()) {
      setErrorMessage("Le nom et le prénom sont requis.");
      return false;
    }

    if (!/^\d{8}$/.test(formData.telephone_personnel)) {
      setErrorMessage("Le téléphone personnel doit contenir exactement 8 chiffres.");
      return false;
    }

    if (!/^\d{8}$/.test(formData.telephone_cabinet)) {
      setErrorMessage("Le téléphone du cabinet doit contenir exactement 8 chiffres.");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Adresse email invalide.");
      return false;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return false;
    }

    if (!formData.nom_specialite) {
      setErrorMessage("Veuillez choisir une spécialité.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    if (!validateForm()) return;

    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "photo_profil") {
        formDataToSend.append(key, value as string);
      }
    });

    if (formData.photo_profil) {
      const uploadData = new FormData();
      uploadData.append("file", formData.photo_profil);
      uploadData.append("upload_preset", "medplat");

      try {
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/daerk3xrm/upload",
          uploadData
        );
        formDataToSend.append("photo_profil", uploadResponse.data.secure_url);
      } catch (uploadError) {
        setErrorMessage("Erreur lors de l'upload de la photo.");
        return;
      }
    }

    setIsLoading(true);

    try {
      await registerDoctor(formDataToSend);
      setFormData({
        cin_medecin: "",
        nom: "",
        prenom: "",
        numero_licence: "",
        nom_specialite: "",
        email: "",
        telephone_personnel: "",
        telephone_cabinet: "",
        adresse_cabinet: "",
        password: "",
        photo_profil: null,
      });
      onRegisterSuccess();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(`Erreur : ${error.message}`);
      } else {
        setErrorMessage("Une erreur inconnue est survenue.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white p-2 rounded-2xl">
      <div className="flex bg-gradient-to-r from-gray-300 to-blue-200 p-3 rounded-4xl shadow-xl w-full max-w-2xl">
        <div className="w-7/9 rounded-4xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-3 mb-4">
            <FaUserMd className="text-indigo-600 text-3xl" />
            Créer votre Cabinet numérique
          </h2>

          {errorMessage && (
            <div className="mb-4 p-4 bg-red-200 border-l-4 border-red-400 text-red-700 rounded-2xl">
              <p>{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="CIN Médecin" name="cin_medecin" type="text" value={formData.cin_medecin} onChange={handleChange} required />
              <InputField label="Nom" name="nom" type="text" value={formData.nom} onChange={handleChange} required />
              <InputField label="Prénom" name="prenom" type="text" value={formData.prenom} onChange={handleChange} required />
              <InputField label="Numéro de Licence" name="numero_licence" type="text" value={formData.numero_licence} onChange={handleChange} required />
            </div>

            <label htmlFor="nom_specialite" className="block text-sm font-medium text-gray-700">Spécialité</label>
            <select
              id="nom_specialite"
              name="nom_specialite"
              value={formData.nom_specialite}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">-- Choisir une spécialité --</option>
              {specialtyOptions.map((specialty: string) => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Téléphone Personnel" name="telephone_personnel" type="tel" value={formData.telephone_personnel} onChange={handleChange} required />
              <InputField label="Téléphone Cabinet" name="telephone_cabinet" type="tel" value={formData.telephone_cabinet} onChange={handleChange} required />
            </div>

            <InputField label="Adresse Cabinet" name="adresse_cabinet" type="text" value={formData.adresse_cabinet} onChange={handleChange} required />
            <InputField label="Mot de Passe" name="password" type="password" value={formData.password} onChange={handleChange} required />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-md font-semibold text-white bg-blue-700 hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : "S'inscrire"}
            </button>
          </form>
        </div>

        <div className="w-3/9 rounded-4xl flex flex-col items-center justify-center pl-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            {formData.photo_profil ? (
              <img src={URL.createObjectURL(formData.photo_profil)} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-gray-400">Photo</span>
            )}
          </div>
          <label htmlFor="photo_profil" className="block text-sm font-medium text-gray-700">Télécharger Photo</label>
          <input
            id="photo_profil"
            name="photo_profil"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterContainer;
