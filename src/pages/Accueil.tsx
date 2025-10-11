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
   
   <Link  to="/sp" > <span className="group hover:text-blue-200">Spécialités</span> </Link>
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
    to="/sp"
    className="border border-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 
               hover:bg-red-800 hover:border-red-800"
  >
    Reserver votre RDV
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
              src="https://cdn.futura-sciences.com/buildsv6/images/wide1920/9/8/d/98da90d895_50182344_secretaire-medicale.jpg"
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
              src="data:image/webp;base64,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"
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
