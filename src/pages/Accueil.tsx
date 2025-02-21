import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Moderne et Responsive */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Professionnel */}
          <div className="flex items-center">
            <img
              src="https://i.pinimg.com/550x/7c/ea/0a/7cea0ad2b9054fb76972b3594d4e1261.jpg"
              alt="MedPlateforme Logo"
              className="h-12 w-12 mr-2"
            />
            <span className="text-2xl font-bold text-gray-800">MedPlateforme</span>
          </div>
          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-6 text-sky-500 font-semibold">
            <a href="#patient" className="hover:text-sky-600">
              Espace Patient
            </a>
            <a href="#about" className="hover:text-sky-600">
              À Propos
            </a>
            <a href="#features" className="hover:text-sky-600">
              Fonctionnalités
            </a>
            <a href="#specialites" className="hover:text-sky-600">
              Spécialités
            </a>
            <Link
              to="/login"
              className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 transition-colors"
            >
              Connexion
            </Link>
          </nav>
          {/* Espace Médecin séparé à droite */}
          <a
  href="#medecin"
  className="flex items-center space-x-2 py-2 px-4 rounded-md bg-indigo-100 hover:bg-indigo-200 text-indigo-600 transition-all ease-in-out duration-300 transform hover:scale-105"
  onClick={() => setMenuOpen(false)}
>
  {/* Logo médical à gauche */}
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_toxasjYNJn27Eq6bIztsNmbApSQVo2UhBrbOr10-aFXBS7xdOOs7HleMralym9NpkVA&usqp=CAU"
    alt="Logo Médecin"
    className="h-8 w-8 rounded-md"
  />
  {/* Texte du lien */}
  <span className="font-semibold text-lg">Espace Médecin</span>
</a>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-sky-500 focus:outline-none"
            >
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <nav className="px-4 py-2 flex flex-col space-y-2 text-sky-500 font-semibold">
              <a href="#patient" onClick={() => setMenuOpen(false)}>
                Espace Patient
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                À Propos
              </a>
              <a href="#features" onClick={() => setMenuOpen(false)}>
                Fonctionnalités
              </a>
              <a href="#specialites" onClick={() => setMenuOpen(false)}>
                Spécialités
              </a>
              <a href="#medecin" onClick={() => setMenuOpen(false)}>
                Espace Médecin
              </a>
              <Link
                to="/login"
                className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600"
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
            </nav>
          </div>
        )}

      {/* Section Hero */}
      </header>
      <section
        className="relative flex flex-col justify-center items-center text-white py-16 px-4"
        style={{
          background:
            'linear-gradient(to right, rgba(50, 150, 250, 0.8), rgba(30, 200, 200, 0.8)), url(https://img.freepik.com/free-photo/family-doctor-visiting-home_23-2148965340.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
        }}
      >
        <div className="relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Vous pouvez tout apprendre sur la santé !
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed">
            Sur <span className="font-bold">MedPlateforme</span>, explorez des articles, conseils et services pour prendre soin de votre santé et celle de votre famille. Gérez vos rendez-vous, suivez vos dossiers et découvrez des actualités médicales.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/RegisterPat"
              className="bg-white hover:bg-gray-200 text-green-600 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Patients, commencez ici
            </Link>
            <Link
              to="/register"
              className="bg-white hover:bg-gray-200 text-green-600 px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Médecins, commencez ici
            </Link>
          </div>
        </div>
      </section>

      {/* Section Espace Patient */}
      <section id="patient" className="py-19 px-3 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Espace Patient</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Gérez vos rendez-vous, consultez vos dossiers médicaux et échangez avec vos professionnels de santé via un tableau de bord intuitif. Découvrez des conseils personnalisés et des articles approfondis pour vous aider à vivre en pleine santé.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src="https://www.formation-secretaire-medicale.com/wp-content/uploads/2023/11/belle-jeune-fille-robe-blanche-est-assise-table-tape-clavier.jpg"
              alt="Famille en consultation"
              className="rounded-lg shadow-lg"
            />
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 mb-4 text-left">
                Rejoignez notre communauté et accédez à votre historique médical, ordonnances, et résultats d'examens. Lisez nos articles pour rester informé sur les nouveautés en santé.
              </p>
              <Link
                to="/RegisterPat"
                className="mx-auto px-6 py-3 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Créer un compte Patient
              </Link>
            </div>
          </div>
          {/* Galerie d'images familiales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            <img
              src="https://formation-medicale.fr/images/formation-secretaire-medicale-sans-bac_1.jpg"
              alt="Famille souriante"
              className="rounded-lg shadow-md"
            />
            <img
              src="https://media.istockphoto.com/id/1279995342/fr/photo/grand-p%C3%A8re-%C3%A9treignant-des-petits-enfants-sur-le-sofa.jpg?s=612x612&w=0&k=20&c=izAiO_xnFgta9v2WEoB3uFoXk5Mb0UQhItj8oMDnlik="
              alt="Consultation familiale"
              className="rounded-lg shadow-md"
            />
            <img
              src="https://media.istockphoto.com/id/1471842339/photo/family-picnic-park-portrait-and-smile-with-kids-parents-or-grandparents-for-bonding-together.jpg?s=612x612&w=0&k=20&c=XdlztFPcZRbvC6asYbf7Vfju0VW97RxhEWlJ73E3fJQ="
              alt="Suivi familial"
              className="rounded-lg shadow-md"
            />
          </div>
          {/* Article sur la santé */}
          <div className="mt-10 text-left text-gray-700">
            <h3 className="text-2xl font-bold mb-2">Conseils Santé du Jour</h3>
            <p className="mb-2">
              <strong>Prévention :</strong> Des visites régulières chez votre médecin permettent d'identifier et de prévenir les maladies chroniques. Adoptez des gestes simples pour votre bien-être quotidien.
            </p>
            <p>
              <strong>Nutrition & Bien-être :</strong> Une alimentation équilibrée et l'exercice régulier sont essentiels pour une bonne santé. Lisez nos articles détaillés pour chaque étape de votre vie.
            </p>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-19 px-3 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">À Propos</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            MedPlateforme met la technologie au service de la santé. Notre équipe de professionnels et de développeurs passionnés œuvre pour offrir une plateforme complète et sécurisée, permettant une collaboration efficace entre patients et médecins.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="https://static.rmnet.be/imgcontrol/clients/rmnet/c750-d511/content/medias/e-health/medical_virtualist.jpg"
              alt="Equipe médicale"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://img.freepik.com/premium-photo/healthcare-medical-medicine-doctor-touching-diagnose-electronic-medical-record-data-patient-modern-interface-hospital-background-innovation_1028938-124643.jpg"
              alt="Collaboration médicale"
              className="rounded-lg shadow-lg"
            />
            <img
              src="https://www.devicelab.com/wp-content/uploads/2017/06/DEVICELAB-IoT-Medical-Devices-Rev.0-800px.jpeg"
              alt="Expérience patient"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-8 text-left">
            <p className="text-gray-700 mb-4">
              Notre mission est de simplifier la gestion de la santé en réunissant patients, médecins et ressources éducatives sur une seule plateforme intuitive.
            </p>
            <p className="text-gray-700">
              Nous croyons que l'information, la prévention et la technologie sont les clés d'un avenir plus sain. Découvrez nos tutoriels, ressources et conseils pour mieux comprendre votre santé.
            </p>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" className="py-21 px-3 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Fonctionnalités
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12">
            MedPlateforme centralise tous vos besoins médicaux. De la gestion des rendez-vous à la téléconsultation, en passant par un accès sécurisé à votre dossier médical, découvrez notre outil complet pour une meilleure gestion de votre santé.
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
                Planifiez et suivez vos rendez-vous grâce à un calendrier interactif, des rappels automatisés et un suivi en temps réel.
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
                Intégrez la téléconsultation et l’ordonnance électronique pour un suivi à distance rapide et sécurisé.
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
                Protégez vos données grâce à un système d’authentification robuste et un cryptage avancé pour une confidentialité totale.
              </p>
            </div>
          </div>

          {/* Galerie d’images supplémentaires */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src="https://img.freepik.com/free-photo/female-doctor-explaining-diagnosis-patient-tablet-his-hospital-room_637285-2770.jpg"
              alt="Consultation en ligne"
              className="rounded-lg shadow-md"
            />
            
            <img
              src="https://media.istockphoto.com/id/1589869656/fr/photo/famille-g%C3%A9n%C3%A9rations-et-portrait-gens-dans-la-nature-et-sourire-avec-les-grands-parents-les.jpg?s=612x612&w=0&k=20&c=Fm3c4elEGBGSDLZR3jCpbiq8a4qh3j6vcyaqsye8uC0="
              alt="Soins à domicile"
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Article d'information */}
          <div className="mt-10 text-left text-gray-700">
            <h3 className="text-2xl font-bold mb-2">Actualités et Conseils Médicaux</h3>
            <p className="mb-2">
              <strong>Prévention & Bien-être :</strong> Adopter de saines habitudes est crucial. Nos experts partagent des conseils pour une vie équilibrée et la prévention des maladies.
            </p>
            <p>
              <strong>Innovation en Santé :</strong> Les technologies comme la téléconsultation révolutionnent les soins. Lisez nos analyses pour rester informé sur les dernières avancées.
            </p>
          </div>
        </div>
      </section>

      {/* Section Espace Médecin */}
      <section id="medecin" className="py-16 px-4 bg-white">
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
          {/* Contenu texte + appel à l'action */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Espace Médecin</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Accédez à un tableau de bord complet pour consulter et gérer vos dossiers patients, organiser vos rendez-vous et partager votre expertise. Optimisez la qualité de vos soins grâce à une vue globale de votre activité.
            </p>
            <Link
              to="/register"
              className="px-6 py-3 rounded-md text-white font-semibold bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              Créer votre cabinet médical
            </Link>
          </div>
        </div>
        {/* Galerie d’images pour médecins */}
        <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
    src="https://img.freepik.com/premium-photo/medicine-doctor-touching-electronic-medical-record-ongenerative-ai_760510-844.jpg"
    alt="Tablette médicale"
    className="w-full h-60 object-cover rounded-lg shadow-md"
  />
  <img
    src="https://img.freepik.com/premium-photo/medicine-doctor-stethoscope-hand-touching-icon-medical-network-connection-with-modern_660230-137995.jpg"
    alt="Technologie médicale"
    className="w-full h-60 object-cover rounded-lg shadow-md"
  />
  <img
    src="https://www.devicelab.com/wp-content/uploads/2017/06/DEVICELAB-IoT-Medical-Devices-Rev.0-800px.jpeg"
    alt="Technologie médicale"
    className="w-full h-60 object-cover rounded-lg shadow-md"
  />
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2025 MedPlateforme - Tous droits réservés.</p>
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
