// ForgotPassword.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link pour naviguer vers d'autres pages

function ForgotPassword() {
  const [email, setEmail] = useState(''); // État pour stocker l'email saisi par l'utilisateur
  const [message, setMessage] = useState(''); // État pour afficher des messages (succès ou erreur)

  // Gérer la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    if (!email) {
      setMessage('Veuillez entrer une adresse email valide.');
      return;
    }
    console.log('Email submitted:', email); // Affiche l'email dans la console (à remplacer par votre logique backend)
    setMessage('Un email de réinitialisation a été envoyé à votre adresse.'); // Message de succès
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url(https://png.pngtree.com/thumb_back/fh260/back_pic/03/87/77/8257d2ce6438b91.jpg)', // Arrière-plan personnalisé
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Conteneur principal centré */}
      <div className="bg-white/80 p-8 rounded-lg shadow-lg w-96 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Réinitialiser votre mot de passe
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Champ Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état de l'email
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-1"
            />
          </div>

          {/* Bouton Envoyer */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Envoyer un email de réinitialisation
          </button>
        </form>

        {/* Message de statut ou d'erreur */}
        {message && (
          <p className="mt-4 text-center text-sm text-green-600">{message}</p> // Message de succès
        )}

        {/* Lien pour retourner à la page de connexion */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Retourner à{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Connexion
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;