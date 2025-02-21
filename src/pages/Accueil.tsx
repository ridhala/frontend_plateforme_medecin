import React from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Barre de navigation */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://img.freepik.com/free-vector/doctor-logo-design-with-stethoscope-icon_1308-13863.jpg?w=996"
              alt="Logo"
              className="h-10 w-10 mr-2"
            />
            <span className="text-xl font-bold text-gray-700">MonDocteur</span>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex space-x-8 text-gray-700 font-semibold">
            {/* Navigation interne à la même page */}
            <a href="#patient" className="hover:text-indigo-600">
              Espace Patient
            </a>
            <a href="#about" className="hover:text-indigo-600">
              À Propos
            </a>
            <a href="#features" className="hover:text-indigo-600">
              Fonctionnalités
            </a>
            {/* Lien vers la page de connexion */}
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Connexion
            </Link>
          </nav>

          {/* Icône Espace Médecin (lien interne dans la même page) */}
          <div className="ml-4">
            <a href="#medecin" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 5h8a2 2 0 002-2v-3H5v3a2 2 0 002 2zM4 4h16v4H4z"
                />
              </svg>
              <span className="text-indigo-600 font-bold text-lg">
                Espace Médecin
              </span>
            </a>
          </div>
        </div>
      </header>

      {/* Section Hero */}
<section
  className="relative bg-cover bg-center flex flex-col justify-center items-center text-white py-16 px-4"
  style={{
    backgroundImage:
      'url(https://img.freepik.com/free-photo/various-medical-equipment-blue-background-top-view_23-2148934239.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '80vh',
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-blue-900 bg-opacity-40"></div>
  
  {/* Contenu */}
  <div className="relative z-10 max-w-5xl text-center">
    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-100">
      Bienvenue sur MedPlateforme
    </h1>
    <p className="text-lg md:text-xl mb-6 text-blue-50 leading-relaxed">
      Votre solution médicale innovante pour simplifier la gestion des
      rendez-vous, des consultations en ligne et du suivi des dossiers
      patients.
    </p>

    {/* Images médicales supplémentaires */}
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <img
        src="https://img.freepik.com/free-photo/doctor-holding-medical-folder-looking-camera-smiling_1258-198.jpg"
        alt="Doctor"
        className="w-40 h-40 object-cover rounded-lg shadow-lg border-2 border-white"
      />
      <img
        src="https://img.freepik.com/free-photo/stethoscope-with-heart-shape-paper-blue_23-2148298117.jpg"
        alt="Stethoscope Heart"
        className="w-40 h-40 object-cover rounded-lg shadow-lg border-2 border-white"
      />
      <img
        src="https://img.freepik.com/free-photo/close-up-hand-holding-blue-ribbon_23-2148882225.jpg"
        alt="Blue Ribbon"
        className="w-40 h-40 object-cover rounded-lg shadow-lg border-2 border-white"
      />
    </div>

    {/* Article Wikipédia (extrait) */}
    <div className="bg-white bg-opacity-90 text-blue-900 p-6 rounded-md mx-auto mb-6 max-w-3xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">
        Un extrait d’article Wikipédia sur la santé :
      </h2>
      <p className="text-sm leading-relaxed">
        « La santé est un état de complet bien-être physique, mental et social,
        et ne consiste pas seulement en une absence de maladie ou d’infirmité. »
        — <a
            href="https://fr.wikipedia.org/wiki/Sant%C3%A9"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-indigo-600"
          >
            Source
          </a>
      </p>
    </div>

    {/* Bouton d'inscription */}
    <div>
      <Link
        to="/register"
        className="inline-block px-6 py-3 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
      >
        S'inscrire maintenant
      </Link>
    </div>
  </div>
</section>


      {/* Section Espace Patient */}
      <section id="patient" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Espace Patient</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Gérez vos rendez-vous, consultez vos dossiers médicaux et
            communiquez avec votre médecin via un tableau de bord intuitif.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src="https://img.freepik.com/free-photo/close-up-patient-talking-with-doctor_23-2148882025.jpg"
              alt="Espace Patient"
              className="rounded-lg shadow-lg"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="text-gray-700 mb-4">
                Rejoignez notre communauté de patients satisfaits et prenez le
                contrôle de votre santé.
              </p>
              <Link
                to="/RegisterPat"
                className="px-6 py-3 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Créer un compte Patient
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">À Propos</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            MonDocteur est une solution innovante conçue pour simplifier la
            gestion des données médicales. Notre équipe de développeurs et de
            professionnels de santé travaille sans relâche pour offrir une
            expérience utilisateur fluide et sécurisée.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="https://img.freepik.com/free-photo/doctor-holding-medical-folder-looking-camera-smiling_1258-198.jpg"
              alt="À propos de nous"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://img.freepik.com/free-photo/hospital-room-with-doctor-patient_53876-40300.jpg"
              alt="À propos de nous"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://img.freepik.com/free-photo/modern-hospital-corridor_53876-12637.jpg"
              alt="À propos de nous"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" className="py-16 px-4 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Fonctionnalités
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12">
            Gérez tous vos besoins médicaux en un seul endroit. MonDocteur vous
            offre une gamme de fonctionnalités conçues pour faciliter la vie des
            médecins et des patients.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carte 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-600 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Gestion des rendez-vous
              </h3>
              <p className="text-gray-600">
                Planifiez et gérez facilement vos rendez-vous avec des
                notifications automatiques.
              </p>
            </div>
            {/* Carte 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-600 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Consultations en ligne
              </h3>
              <p className="text-gray-600">
                Suivez les consultations de vos patients directement depuis
                votre tableau de bord.
              </p>
            </div>
            {/* Carte 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indigo-600 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Profil sécurisé
              </h3>
              <p className="text-gray-600">
                Protégez vos données sensibles avec un système
                d’authentification robuste.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Espace Médecin */}
      <section
        id="medecin"
        className="py-16 px-4 bg-white"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center md:space-x-8">
          {/* Grande Icône ou Image */}
          <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-48 w-48 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17v2a1 1 0 001 1h4a1 1 0 001-1v-2M14.828 9l2.586-2.586a2 2 0 00-2.828-2.828L12 6.172 9.414 3.586a2 2 0 00-2.828 2.828L9 9m-2 5l1.586 1.586a2 2 0 002.828 0L13 14m0 0l1.586-1.586a2 2 0 012.828 0L19 14"
              />
            </svg>
          </div>
          {/* Contenu texte + bouton */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Espace Médecin
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Consultez et gérez les dossiers médicaux de vos patients,
              organisez vos rendez-vous et publiez des articles médicaux pour
              partager votre expertise.
            </p>
            <Link
              to="/register"
              className="px-6 py-3 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Créer votre cabinet médical
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="mb-4">
            © 2025 MonDocteur - Tous droits réservés.
          </p>
          <Link
            to="/login"
            className="px-6 py-3 rounded-md bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors"
          >
            Connexion
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Accueil;
