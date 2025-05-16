// src/pages/ListeMedecins.tsx
import { useNavigate } from "react-router-dom";
import { MedecinProfile } from "../../types/profilemedecin";
import { ArrowLeft, Phone, Mail, MapPin} from "lucide-react";

interface ListeMedecinsProps {
  specialty: string;
  listmedecin: MedecinProfile[];
  onBack: ()=> void

}

export const ListeMedecinschoisi = ({ specialty, listmedecin, onBack }: ListeMedecinsProps) => {
const navigate=useNavigate()

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header avec bouton retour */}
      <div className="flex items-center mb-8">
        <button 
          onClick={onBack} 
          className="mr-4 p-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{specialty}</h1>
          <p className="text-gray-500 mt-1">
            {listmedecin.length} médecin{listmedecin.length > 1 ? 's' : ''} disponible{listmedecin.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Liste des médecins */}
      {listmedecin.length > 0 ? (
        <div className="space-y-12">
          {listmedecin.map((medecin) => (
            <div 
              key={medecin._id} 
              className="bg-blue-50 rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all"
            >
              <div className="p-6 md:flex">
                {/* Photo et info de base */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                  <div className="h-32 w-32 rounded-full bg-gray-100 overflow-hidden border-2 border-blue-50">
                    {medecin.photo_profil ? (
                      <img 
                        src={medecin.photo_profil} 
                        alt={`Dr. ${medecin.nom}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl">
                        👨‍⚕️
                      </div>
                    )}
                  </div>
                </div>

                {/* Détails principaux */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Dr. {medecin.prenom} {medecin.nom}
                      </h2>
                      <p className="text-blue-600 font-medium">{specialty}</p>
                      <p className="text-gray-500 mt-2 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {medecin.adresse_cabinet}
                      </p>
                    </div>

                    <div className="mt-4 md:mt-0 md:text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        {medecin ? "60 D" : 'Non renseigné'}
                      </p>
                      <p className="text-sm text-gray-500">Consultation</p>
                    </div>
                  </div>

                  {/* Informations de contact */}
             
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <a href={`tel:${medecin.telephone_cabinet}`} className="text-gray-700 hover:text-blue-600">
                        {medecin.telephone_cabinet}
                      </a>
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <a href={`mailto:${medecin.email}`} className="text-gray-700 hover:text-blue-600">
                        {medecin.email}
                      </a>
                    </div>
                

                  {/* Disponibilités */}
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Disponibilités
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                   <button
  onClick={() => navigate(`salleAttente`, { state: { medecin: medecin } })}
  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
>
  consulter salle d'attente
</button>

                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Voir le profil complet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">Aucun médecin disponible</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Nous n'avons trouvé aucun médecin spécialisé en {specialty} pour le moment.
          </p>
        
        </div>
      )}
    </div>
  );
};