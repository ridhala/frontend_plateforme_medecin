import { useLocation, useNavigate } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  LanguageIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  distance: number;
  address: string;
  image: string;
  price: number;
  languages: string[];
  education: string;
  experience: number;
  mapUrl: string;
};

const doctorsData: Record<string, Doctor[]> = {
  'General Medicine': [
    {
      id: 'doc1',
      name: 'Dr. Sophie Martin',
      specialty: 'General Medicine',
      distance: 1.2,
      address: '15 Rue de la Paix, Paris 75002',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      price: 25,
      languages: ['Français', 'Anglais'],
      education: 'Université Paris Descartes',
      experience: 12,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991626693345!2d2.331642315674389!3d48.86851077928835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e3a948fb3b5%3A0x6e5e3a9d7a3b4b1d!2s15%20Rue%20de%20la%20Paix%2C%2075002%20Paris!5e0!3m2!1sfr!2sfr!4v1623760000000!5m2!1sfr!2sfr'
    },
    {
      id: 'doc2',
      name: 'Dr. Jean Dupont',
      specialty: 'General Medicine',
      distance: 2.5,
      address: '22 Boulevard Saint-Germain, Paris 75005',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      price: 30,
      languages: ['Français', 'Espagnol'],
      education: 'Université Pierre et Marie Curie',
      experience: 8,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0000000000005!2d2.3399999999999994!3d48.853000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671c7785c4fd9%3A0x5e9e5e5e5e5e5e5e!2s22%20Boulevard%20Saint-Germain%2C%2075005%20Paris!5e0!3m2!1sfr!2sfr!4v1623760000000!5m2!1sfr!2sfr'
    }
  ],
  'Cardiology': [
    {
      id: 'doc3',
      name: 'Dr. Claire Dubois',
      specialty: 'Cardiology',
      distance: 3.1,
      address: '8 Avenue de la République, Paris 75011',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      price: 50,
      languages: ['Français', 'Anglais', 'Arabe'],
      education: 'Université Paris Diderot',
      experience: 15,
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.0000000000005!2d2.3699999999999997!3d48.857000000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66df0e9b3b3b3%3A0x5e9e5e5e5e5e5e5e!2s8%20Avenue%20de%20la%20R%C3%A9publique%2C%2075011%20Paris!5e0!3m2!1sfr!2sfr!4v1623760000000!5m2!1sfr!2sfr'
    }
  ]
};

export default function ListeMedecins() {
  const location = useLocation();
  const navigate = useNavigate();
  const specialty = location.state?.specialty || 'General Medicine';
  const doctors = doctorsData[specialty] || [];

  const handleGoToWaitingRoom = (doctorId: string) => {
    navigate('/salle-attente', { 
      state: { 
        doctor: doctors.find(d => d.id === doctorId),
        specialty: specialty
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Header avec effet visuel médical */}
      <div className="relative bg-gradient-to-r from-gray-600 to-green-500 text-white pb-12">
        {/* Background Image avec filtre */}
        <div
          className="absolute inset-0 bg-cover bg-blend-multiply"
          style={{
            backgroundImage: "url('https://f.maformation.fr/edito/sites/3/2017/12/secretaire.jpeg')",
            backgroundPosition: "center",
            filter: "brightness(50%) saturate(120%) blur(1px)",
          }}
        ></div>
        
        {/* Navigation */}
        <nav className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-white hover:text-blue-100 transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span className="text-sm font-medium">Retour</span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="bg-white p-1.5 rounded-full shadow-lg">
                  <HeartIcon className="h-5 w-5 text-red-500" />
                </div>
                <h1 className="text-lg font-bold text-white">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Medplat</span>
                </h1>
              </div>
              
              <div className="w-16"></div>
            </div>
          </div>
        </nav>

        {/* Titre principal */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Trouvez votre {specialty.toLowerCase()}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Des professionnels de santé qualifiés près de chez vous
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 -mt-12 relative z-10">
        {/* Liste des médecins */}
        <div className="grid grid-cols-1 gap-6">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Photo et carte */}
                    <div className="flex-shrink-0 space-y-4 w-full md:w-auto">
                      <div className="relative">
                        <img
                          className="h-32 w-32 rounded-xl object-cover border-4 border-white shadow-md mx-auto md:mx-0"
                          src={doctor.image}
                          alt={`Photo de ${doctor.name}`}
                        />
                        <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-sm text-xs font-medium text-blue-700 border border-blue-200">
                          {doctor.experience}+ ans exp.
                        </div>
                      </div>
                      
                      {/* Carte Google Maps */}
                      <div className="h-40 w-full md:w-56 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                        <iframe
                          title={`Carte pour ${doctor.name}`}
                          src={doctor.mapUrl}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                    
                    {/* Informations principales */}
                    <div className="flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
                            <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-900">{doctor.price}€</span>
                            <span className="text-gray-500 text-xs block">/ consultation</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <MapPinIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 mb-1">Adresse</h4>
                              <p className="text-sm text-gray-700">{doctor.address}</p>
                              <p className="text-xs text-blue-600 mt-1">
                                <span className="font-medium">{doctor.distance} km</span> de vous
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <AcademicCapIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 mb-1">Formation</h4>
                              <p className="text-sm text-gray-700">{doctor.education}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              <LanguageIcon className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-gray-500 mb-1">Langues</h4>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {doctor.languages.map((lang, idx) => (
                                  <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                                    {lang}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Boutons d'action */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                          <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                            <PhoneIcon className="h-4 w-4 mr-2 text-gray-500" />
                            Contacter
                          </button>
                          <button
                            onClick={() => handleGoToWaitingRoom(doctor.id)}
                            className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md"
                          >
                            <ArrowRightIcon className="h-4 w-4 mr-2" />
                            Prendre RDV
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-3 text-xl font-medium text-gray-900">Aucun médecin disponible</h3>
              <p className="mt-2 text-sm text-gray-600 max-w-md mx-auto">
                Nous n'avons pas trouvé de médecin correspondant à vos critères de recherche.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <ArrowLeftIcon className="-ml-1 mr-2 h-4 w-4" />
                  Retour aux spécialités
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}