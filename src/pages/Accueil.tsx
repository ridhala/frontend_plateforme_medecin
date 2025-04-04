import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Accueil() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Section Hero + Navbar dans la même zone */}
      <section
        className="relative bg-no-repeat bg-cover bg-center text-white"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 44, 79, 0.7), rgba(0, 102, 128, 0.7)), url(https://www.pourquoidocteur.fr/media/article/COPY_istock-1279995342-1730552453.jpg)',
          minHeight: '100vh', // La zone s'étend sur toute la hauteur de la fenêtre
        }}
      >
        {/* Navbar + Header dans la zone du background */}
        <header className="sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo Professionnel à gauche */}
<div className="flex items-center space-x-2">
  <img
    src="https://st2.depositphotos.com/4362315/7819/v/450/depositphotos_78194048-stock-illustration-medical-logo-health-care-center.jpg"
    alt="MedPlateforme Logo"
    className="h-12 w-12 object-contain mix-blend-multiply"
  />
  <span className="text-3xl italic font-extrabold tracking-tight text-white">
    MedPlat
  </span>
</div>


          {/* Menu Desktop */}
<nav className="hidden md:flex items-center space-x-8 font-medium ml-auto">
  <a
    href="#patient"
    className="relative text-white text-lg hover:text-blue-200 transition-colors"
  >
    <span className="group hover:text-blue-200">Espace Patient</span>
    <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-blue-200 transition-all duration-300"></span>
  </a>
  <a
    href="#about"
    className="relative text-white text-lg hover:text-blue-200 transition-colors"
  >
    <span className="group hover:text-blue-200">À Propos</span>
    <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-blue-200 transition-all duration-300"></span>
  </a>
  <a
    href="#features"
    className="relative text-white text-lg hover:text-blue-200 transition-colors"
  >
    <span className="group hover:text-blue-200">
      Fonctionnalités
    </span>
    <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-blue-200 transition-all duration-300"></span>
  </a>
  <a
    href="#specialites"
    className="relative text-white text-lg hover:text-blue-200 transition-colors"
  >
    <span className="group hover:text-blue-200">Spécialités</span>
    <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 bg-blue-200 transition-all duration-300"></span>
  </a>
  <Link
    to="/login"
    className="border border-gray-300 text-white text-lg px-6 py-2 rounded-full hover:bg-[#800020] hover:border-[#800020] transition-colors"
  >
    Connexion
  </Link>
</nav>



     {/* Bouton Espace Médecin (Desktop) */}
<div className="hidden md:flex">
  <a
    href="#medecin"
    className="flex items-center space-x-2 py-2 px-6 ml-4 rounded-full border border-[#800020] bg-[#800020] hover:bg-[#990024] text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow"
  >
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_toxasjYNJn27Eq6bIztsNmbApSQVo2UhBrbOr10-aFXBS7xdOOs7HleMralym9NpkVA&usqp=CAU"
      alt="Logo Médecin"
      className="h-6 w-6 rounded-full object-cover"
    />
    <span className="font-medium text-sm">Espace Médecin</span>
  </a>
</div>


            {/* Menu Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
              >
                {menuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Menu Mobile déroulant */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow-md">
              <nav className="px-4 py-4 flex flex-col space-y-3 text-gray-700 font-medium">
                <a
                  href="#patient"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Espace Patient
                </a>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  À Propos
                </a>
                <a
                  href="#features"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Fonctionnalités
                </a>
                <a
                  href="#specialites"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Spécialités
                </a>
                <a
                  href="#medecin"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-blue-600"
                >
                  Espace Médecin
                </a>
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  Connexion
                </Link>
              </nav>
            </div>
          )}
        </header>

        {/* Contenu "Hero" au-dessus du background */}
<div
  className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center text-white mt-10"
  style={{ minHeight: 'calc(80vh - 4rem)' }} // Ajuste la hauteur si besoin
>
  <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
    MedPlat
  </h1>
  
  <h2 className="text-2xl md:text-4xl font-light mb-4">
    La plateforme médicale innovante en Tunisie
  </h2>
  
  <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
    Accédez à des services médicaux modernes, prenez rendez-vous en ligne et 
    simplifiez votre suivi de santé.
  </p>

  {/* Bouton emmene au register */}
  <Link
    to="/RegisterPat"
    className="border border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 
               hover:bg-red-800 hover:border-red-800"
  >
    Patients, commencez ici
  </Link>
</div>


      </section>

      {/* Section Espace Patient */}
      <section id="patient" className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            Espace Patient
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Gérez vos rendez-vous, consultez vos dossiers médicaux et échangez avec
            vos professionnels de santé via un tableau de bord intuitif. Découvrez
            des conseils personnalisés et des articles approfondis pour vous aider à
            vivre en pleine santé.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src="https://www.formation-secretaire-medicale.com/wp-content/uploads/2023/11/belle-jeune-fille-robe-blanche-est-assise-table-tape-clavier.jpg"
              alt="Famille en consultation"
              className="rounded-lg shadow-lg w-full"
            />
            <div className="flex flex-col justify-center text-left">
              <p className="text-gray-700 mb-4">
                Rejoignez notre communauté et accédez à votre historique médical,
                ordonnances, et résultats d'examens. Lisez nos articles pour rester
                informé sur les nouveautés en santé.
              </p>
              <Link
                to="/RegisterPat"
                className="w-fit mx-auto md:mx-0 px-6 py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
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
              className="rounded-lg shadow-md w-full"
            />
            <img
              src="https://media.istockphoto.com/id/1279995342/fr/photo/grand-p%C3%A8re-%C3%A9treignant-des-petits-enfants-sur-le-sofa.jpg?s=612x612&w=0&k=20&c=izAiO_xnFgta9v2WEoB3uFoXk5Mb0UQhItj8oMDnlik="
              alt="Consultation familiale"
              className="rounded-lg shadow-md w-full"
            />
            <img
              src="https://media.istockphoto.com/id/1471842339/photo/family-picnic-park-portrait-and-smile-with-kids-parents-or-grandparents-for-bonding-together.jpg?s=612x612&w=0&k=20&c=XdlztFPcZRbvC6asYbf7Vfju0VW97RxhEWlJ73E3fJQ="
              alt="Suivi familial"
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* Article sur la santé */}
          <div className="mt-10 text-left text-gray-700">
            <h3 className="text-2xl font-bold mb-2">Conseils Santé du Jour</h3>
            <p className="mb-2">
              <strong>Prévention :</strong> Des visites régulières chez votre
              médecin permettent d'identifier et de prévenir les maladies chroniques.
              Adoptez des gestes simples pour votre bien-être quotidien.
            </p>
            <p>
              <strong>Nutrition &amp; Bien-être :</strong> Une alimentation
              équilibrée et l'exercice régulier sont essentiels pour une bonne santé.
              Lisez nos articles détaillés pour chaque étape de votre vie.
            </p>
          </div>
        </div>
      </section>

      {/* Section À Propos */}
      <section id="about" className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            À Propos
          </h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            MedPlateforme met la technologie au service de la santé. Notre équipe de
            professionnels et de développeurs passionnés œuvre pour offrir une
            plateforme complète et sécurisée, permettant une collaboration efficace
            entre patients et médecins.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img
              src="https://static.rmnet.be/imgcontrol/clients/rmnet/c750-d511/content/medias/e-health/medical_virtualist.jpg"
              alt="Equipe médicale"
              className="rounded-lg shadow-lg w-full"
            />
            <img
              src="https://img.freepik.com/premium-photo/healthcare-medical-medicine-doctor-touching-diagnose-electronic-medical-record-data-patient-modern-interface-hospital-background-innovation_1028938-124643.jpg"
              alt="Collaboration médicale"
              className="rounded-lg shadow-lg w-full"
            />
            <img
              src="https://www.devicelab.com/wp-content/uploads/2017/06/DEVICELAB-IoT-Medical-Devices-Rev.0-800px.jpeg"
              alt="Expérience patient"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="mt-8 text-left text-gray-700">
            <p className="mb-4">
              Notre mission est de simplifier la gestion de la santé en réunissant
              patients, médecins et ressources éducatives sur une seule plateforme
              intuitive.
            </p>
            <p>
              Nous croyons que l'information, la prévention et la technologie sont
              les clés d'un avenir plus sain. Découvrez nos tutoriels, ressources et
              conseils pour mieux comprendre votre santé.
            </p>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section id="features" className="py-16 px-4 bg-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            Fonctionnalités
          </h2>
          <p className="text-gray-600 leading-relaxed mb-12">
            MedPlateforme centralise tous vos besoins médicaux. De la gestion des
            rendez-vous à la téléconsultation, en passant par un accès sécurisé à
            votre dossier médical, découvrez notre outil complet pour une meilleure
            gestion de votre santé.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carte 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600 mx-auto mb-4"
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
                Planifiez et suivez vos rendez-vous grâce à un calendrier
                interactif, des rappels automatisés et un suivi en temps réel.
              </p>
            </div>
            {/* Carte 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600 mx-auto mb-4"
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
                Intégrez la téléconsultation et l’ordonnance électronique pour un
                suivi à distance rapide et sécurisé.
              </p>
            </div>
            {/* Carte 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-600 mx-auto mb-4"
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
                Protégez vos données grâce à un système d’authentification robuste
                et un cryptage avancé pour une confidentialité totale.
              </p>
            </div>
          </div>

          {/* Galerie d’images supplémentaires */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src="https://img.freepik.com/free-photo/female-doctor-explaining-diagnosis-patient-tablet-his-hospital-room_637285-2770.jpg"
              alt="Consultation en ligne"
              className="rounded-lg shadow-md w-full"
            />
            <img
              src="https://media.istockphoto.com/id/1589869656/fr/photo/famille-g%C3%A9n%C3%A9rations-et-portrait-gens-dans-la-nature-et-sourire-avec-les-grands-parents-les.jpg?s=612x612&w=0&k=20&c=Fm3c4elEGBGSDLZR3jCpbiq8a4qh3j6vcyaqsye8uC0="
              alt="Soins à domicile"
              className="rounded-lg shadow-md w-full"
            />
          </div>

          {/* Article d'information */}
          <div className="mt-10 text-left text-gray-700">
            <h3 className="text-2xl font-bold mb-2">
              Actualités et Conseils Médicaux
            </h3>
            <p className="mb-2">
              <strong>Prévention &amp; Bien-être :</strong> Adopter de saines
              habitudes est crucial. Nos experts partagent des conseils pour une vie
              équilibrée et la prévention des maladies.
            </p>
            <p>
              <strong>Innovation en Santé :</strong> Les technologies comme la
              téléconsultation révolutionnent les soins. Lisez nos analyses pour
              rester informé sur les dernières avancées.
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
              className="h-48 w-48 text-blue-600"
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Espace Médecin
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Accédez à un tableau de bord complet pour consulter et gérer vos
              dossiers patients, organiser vos rendez-vous et partager votre
              expertise. Optimisez la qualité de vos soins grâce à une vue globale de
              votre activité.
            </p>
            <Link
              to="/register"
              className="px-6 py-3 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-colors"
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
      <footer className="bg-blue-900 text-white py-8 mt-auto">
        <div className="container mx-auto text-center">
          <p className="mb-4">© 2025 MedPlateforme - Tous droits réservés.</p>
          
        </div>
      </footer>
    </div>
  );
}

export default Accueil;
