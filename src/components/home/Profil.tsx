import React, { useState } from "react";

export default function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Nom de l'utilisateur",
    email: "user@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue Exemple, Paris",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Ici, tu peux ajouter une logique pour sauvegarder les modifications (ex: API)
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center border-b pb-4 mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
          <img
            src="https://www.cliniquecic.ch/data/dataimages/Upload/thumbnails/zoom_PapaNata.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-3">
          {userData.name}
        </h2>
        <p className="text-gray-500 text-sm">Utilisateur | Rôle</p>
      </div>

      {/* Affichage des infos ou Formulaire */}
      {!isEditing ? (
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email :</span>
            <span className="text-gray-600">{userData.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Téléphone :</span>
            <span className="text-gray-600">{userData.phone}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Adresse :</span>
            <span className="text-gray-600">{userData.address}</span>
          </div>
          {/* Bouton Modifier */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Modifier le Profil
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-gray-700">
          <div className="flex flex-col">
            <label className="font-medium">Nom :</label>
            <input
              type="text"
              name="name"
              value={userData.name}
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
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium">Adresse :</label>
            <input
              type="text"
              name="address"
              value={userData.address}
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
              onClick={() => setIsEditing(false)}
              className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
