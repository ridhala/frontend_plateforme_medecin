import { useLocation, useNavigate } from 'react-router-dom';
import { 
  StarIcon, 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon, 
  PhoneIcon,
  ArrowRightIcon,
  UserIcon,
  AcademicCapIcon,
  LanguageIcon
} from '@heroicons/react/24/solid';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: number;
  address: string;
  image: string;
  availability: string[];
  price: number;
  languages: string[];
  education: string;
  experience: number;
};

const doctorsData: Record<string, Doctor[]> = {
  'General Medicine': [
    {
      id: 'doc1',
      name: 'Dr. Sophie Martin',
      specialty: 'General Medicine',
      rating: 4.9,
      reviews: 127,
      distance: 1.2,
      address: '15 Rue de la Paix, Paris 75002',
      image: 'https://randomuser.me/api/portraits/women/65.jpg',
      availability: ['Lun 09:00-12:00', 'Mar 14:00-18:00', 'Jeu 08:00-12:00'],
      price: 25,
      languages: ['Français', 'Anglais'],
      education: 'Université Paris Descartes',
      experience: 12
    },
    {
      id: 'doc2',
      name: 'Dr. Jean Dupont',
      specialty: 'General Medicine',
      rating: 4.7,
      reviews: 89,
      distance: 2.5,
      address: '22 Boulevard Saint-Germain, Paris 75005',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      availability: ['Mar 08:00-12:00', 'Mer 13:00-17:00', 'Ven 09:00-13:00'],
      price: 30,
      languages: ['Français', 'Espagnol'],
      education: 'Université Pierre et Marie Curie',
      experience: 8
    }
  ],
  'Cardiology': [
    {
      id: 'doc3',
      name: 'Dr. Claire Dubois',
      specialty: 'Cardiology',
      rating: 4.8,
      reviews: 156,
      distance: 3.1,
      address: '8 Avenue de la République, Paris 75011',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      availability: ['Lun 10:00-13:00', 'Mer 14:00-18:00', 'Ven 09:00-12:00'],
      price: 50,
      languages: ['Français', 'Anglais', 'Arabe'],
      education: 'Université Paris Diderot',
      experience: 15
    }
  ],
  'Dermatology': [
    {
      id: 'doc4',
      name: 'Dr. Michel Lambert',
      specialty: 'Dermatology',
      rating: 4.6,
      reviews: 94,
      distance: 0.8,
      address: '30 Rue de Rivoli, Paris 75004',
      image: 'https://randomuser.me/api/portraits/men/75.jpg',
      availability: ['Mar 09:00-13:00', 'Jeu 14:00-19:00', 'Sam 10:00-14:00'],
      price: 45,
      languages: ['Français', 'Anglais'],
      education: 'Université Paris-Sud',
      experience: 10
    },
    {
      id: 'doc5',
      name: 'Dr. Amélie Rousseau',
      specialty: 'Dermatology',
      rating: 4.9,
      reviews: 203,
      distance: 1.7,
      address: '5 Rue de la Pompe, Paris 75016',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      availability: ['Lun 13:00-18:00', 'Mer 08:00-12:00', 'Ven 14:00-18:00'],
      price: 55,
      languages: ['Français', 'Italien'],
      education: 'Université Paris Descartes',
      experience: 18
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      {/* Navigation améliorée */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="text-lg font-medium">Retour</span>
            </button>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">Medplat</h1>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header amélioré */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
              Médecins en {specialty}
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {doctors.length > 0 
              ? `${doctors.length} spécialistes disponibles près de chez vous`
              : 'Aucun médecin disponible pour cette spécialité actuellement'}
          </p>
        </div>

        {/* Filtres améliorés */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-10 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="location"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 py-3 border-gray-300 rounded-lg text-base"
                  placeholder="Paris, France"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="availability" className="block text-sm font-medium text-gray-700 mb-2">Disponibilité</label>
              <div className="relative">
                <select
                  id="availability"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                  <option>Prochainement</option>
                  <option>Aujourd'hui</option>
                  <option>Cette semaine</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
              <div className="relative">
                <select
                  id="sort"
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                  <option>Meilleures notes</option>
                  <option>Plus proches</option>
                  <option>Prix croissant</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Doctors List améliorée */}
        <div className="space-y-8">
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="p-8">
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Doctor Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          className="h-40 w-40 rounded-xl object-cover border-4 border-white shadow-md"
                          src={doctor.image}
                          alt={`Photo de ${doctor.name}`}
                        />
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full shadow-lg flex items-center">
                          <StarIcon className="h-4 w-4 text-yellow-300 mr-1" />
                          <span className="font-bold">{doctor.rating}</span>
                          <span className="text-xs ml-1">({doctor.reviews})</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Doctor Info */}
                    <div className="flex-1">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-900">{doctor.name}</h2>
                              <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-3xl font-bold text-gray-900">{doctor.price}€</span>
                              <span className="text-gray-500 text-sm block">/ consultation</span>
                            </div>
                          </div>
                          
                          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start">
                              <MapPinIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Adresse</h4>
                                <p className="text-gray-700">{doctor.address}</p>
                                <p className="text-sm text-blue-600 mt-1">{doctor.distance} km de vous</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Formation</h4>
                                <p className="text-gray-700">{doctor.education}</p>
                                <p className="text-sm text-gray-500 mt-1">{doctor.experience} ans d'expérience</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <LanguageIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Langues parlées</h4>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {doctor.languages.map((lang, idx) => (
                                    <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs">
                                      {lang}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <ClockIcon className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                              <div>
                                <h4 className="text-sm font-medium text-gray-500">Disponibilités</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {doctor.availability.map((slot, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                      <ClockIcon className="h-3 w-3 mr-1" />
                                      {slot}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
                          <button className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                            <PhoneIcon className="h-5 w-5 mr-2 text-gray-500" />
                            Contacter
                          </button>
                          <button
                            onClick={() => handleGoToWaitingRoom(doctor.id)}
                            className="flex items-center justify-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                          >
                            <ArrowRightIcon className="h-5 w-5 mr-2" />
                            Aller en salle d'attente
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-2xl font-medium text-gray-900">Aucun médecin disponible</h3>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                Nous n'avons pas trouvé de médecin correspondant à vos critères de recherche.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
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