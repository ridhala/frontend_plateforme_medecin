import React, { useState } from "react";
import { FaUserMd } from "react-icons/fa"; // Doctor Icon
import InputField from "../../components/register/RegisterInputField"; // Import the InputField component
import { registerDoctor } from "../../services/registerdoctorService"; // Import the service for doctor registration
import { DoctorFormData } from "../../types/doctorregistertype"; // Import the DoctorFormData type

interface RegisterContainerProps {
  onRegisterSuccess: () => void; // Prop for handling successful registration
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

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error messages

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
        photo_profil: e.target.files?.[0],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append all text fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "photo_profil") {
        formDataToSend.append(key, value as string);
      }
    });

    // Append file field separately
    if (formData.photo_profil) {
      formDataToSend.append("photo_profil", formData.photo_profil);
    }

    try {
      console.log(formDataToSend);
      await registerDoctor(formDataToSend);
      console.log("Inscription réussie:", formData);

      // Reset the form
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

      // Call the success callback
      onRegisterSuccess();
    } catch (error) {
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
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="flex bg-white-150 p-8 rounded-xl shadow-xl w-full max-w-4xl border-t-4 border-indigo-600">
        {/* Registration Form Section */}
        <div className="w-2/3">
          {/* Title with Doctor Icon */}
          <h2 className="text-2xl font-bold text-center text-gray-900 flex items-center justify-center gap-3 mb-6">
            <FaUserMd className="text-indigo-600 text-3xl" />
            Create a Doctor Account
          </h2>

          {/* Display error message */}
          {errorMessage && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-md">
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="CIN Médecin"
                type="text"
                name="cin_medecin"
                value={formData.cin_medecin}
                onChange={handleChange}
                required
              />

              <InputField
                label="Nom"
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
              />

              <InputField
                label="Prénom"
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
              />

              <InputField
                label="Numéro de Licence"
                type="text"
                name="numero_licence"
                value={formData.numero_licence}
                onChange={handleChange}
                required
              />
            </div>

            <InputField
              label="Spécialité"
              type="text"
              name="nom_specialite"
              value={formData.nom_specialite}
              onChange={handleChange}
              required
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Téléphone Personnel"
                type="tel"
                name="telephone_personnel"
                value={formData.telephone_personnel}
                onChange={handleChange}
                required
              />

              <InputField
                label="Téléphone Cabinet"
                type="tel"
                name="telephone_cabinet"
                value={formData.telephone_cabinet}
                onChange={handleChange}
                required
              />
            </div>

            <InputField
              label="Adresse Cabinet"
              type="text"
              name="adresse_cabinet"
              value={formData.adresse_cabinet}
              onChange={handleChange}
              required
            />

            <InputField
              label="Mot de Passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            {/* Submit Button */}
            <button
 onClick={handleSubmit}     
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-md font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>
        </div>

        {/* Profile Photo Section */}
        <div className="w-1/3 flex flex-col items-center justify-center pl-8">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            {formData.photo_profil ? (
              <img
                src={URL.createObjectURL(formData.photo_profil)}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Photo</span>
            )}
          </div>
          <label
            htmlFor="photo_profil"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Profile Photo
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
      </div>
    </div>
  );
}

export default RegisterContainer;