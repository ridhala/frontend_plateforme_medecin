// DossierMedicale.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiDownload, FiChevronDown, FiChevronUp, FiFile } from 'react-icons/fi';
import { FaStethoscope } from 'react-icons/fa';

interface DossierMedical {
  id: string;
  date: string;
  type: 'consultation';
  titre: string;
  details: string;
  medecin: string;
  fichiers: {
    nom: string;
    type: 'rapport' | 'ordonnance' | 'certificat' | 'autre';
  }[];
  urgence: 'faible' | 'moyenne' | 'élevée';
}

const DossierMedicale: React.FC = () => {
  const [dossiers, setDossiers] = useState<DossierMedical[]>([]);
  const [carteDeveloppee, setCarteDeveloppee] = useState<string | null>(null);
  const [termeRecherche, setTermeRecherche] = useState('');
  const [periode, setPeriode] = useState<'tous' | '1mois' | '6mois'>('tous');
  const [chargement, setChargement] = useState(false);

  // Données fictives
  const dossiersExemple: DossierMedical[] = [
    {
      id: '13',
      date: '2023-03-18T10:15:00Z',
      type: 'consultation',
      titre: 'Suivi diabète',
      details: 'Contrôle glycémique satisfaisant sous traitement. HbA1c à 6.2%. Adaptation des doses d\'insuline : réduire la dose du soir de 2 unités. Prochain contrôle dans 3 mois.',
      medecin: 'Dr Laurent Diab',
      fichiers: [
        { nom: 'rapport_diabete.pdf', type: 'rapport' },
        { nom: 'ordonnance_diabete.pdf', type: 'ordonnance' },
        { nom: 'certificat_controle.pdf', type: 'certificat' }
      ],
      urgence: 'moyenne',
    },
    {
      id: '1',
      date: '2023-06-15T09:30:00Z',
      type: 'consultation',
      titre: 'Bilan annuel',
      details: 'Le patient signale des maux de tête occasionnels. Tension artérielle légèrement élevée.',
      medecin: 'Dr Sophie Martin',
      fichiers: [
        { nom: 'bilan_annuel.pdf', type: 'rapport' },
        { nom: 'analyses_sanguines.pdf', type: 'autre' }
      ],
      urgence: 'moyenne',
    },
    {
      id: '15',
      date: '2023-01-10T16:45:00Z',
      type: 'consultation',
      titre: 'Consultation dermatologique',
      details: "Examen d'une lésion cutanée suspecte sur l'épaule gauche. Diagnostic : kératose séborrhéique bénigne. Pas de traitement nécessaire mais surveillance annuelle recommandée.",
      medecin: 'Dr Emma Dermat',
      fichiers: [
        { nom: 'compte_rendu_dermatologie.pdf', type: 'rapport' },
        { nom: 'photos_lesion.pdf', type: 'autre' }
      ],
      urgence: 'faible',
    },
    {
      id: '13',
      date: '2023-03-18T10:15:00Z',
      type: 'consultation',
      titre: 'Suivi génerale',
      details: 'Contrôle géneral satisfaisant sous traitement. HbA1c à 6.2%. Adaptation des doses d\'insuline : réduire la dose du soir de 2 unités. Prochain contrôle dans 3 mois.',
      medecin: 'Dr Jhon Paul',
      fichiers: [
        { nom: 'rapport_diabete.pdf', type: 'rapport' },
        { nom: 'ordonnance_diabete.pdf', type: 'ordonnance' },
        { nom: 'certificat_controle.pdf', type: 'certificat' }
      ],
      urgence: 'moyenne',
    },
   
  ];

  useEffect(() => {
    setChargement(true);
    // Simulation d'appel API
    setTimeout(() => {
      setDossiers(dossiersExemple);
      setChargement(false);
    }, 500);
  }, []);

  const dossiersFiltres = dossiers.filter((dossier) => {
    const correspondRecherche =
      dossier.titre.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      dossier.details.toLowerCase().includes(termeRecherche.toLowerCase()) ||
      dossier.medecin.toLowerCase().includes(termeRecherche.toLowerCase());
    const dateDossier = new Date(dossier.date);
    const maintenant = new Date();

    if (periode === '1mois') {
      const ilYaUnMois = new Date(maintenant.setMonth(maintenant.getMonth() - 1));
      return correspondRecherche && dateDossier >= ilYaUnMois;
    } else if (periode === '6mois') {
      const ilYaSixMois = new Date(maintenant.setMonth(maintenant.getMonth() - 6));
      return correspondRecherche && dateDossier >= ilYaSixMois;
    }
    return correspondRecherche;
  });

  const getCouleurUrgence = (urgence: DossierMedical['urgence']) => {
    switch (urgence) {
      case 'élevée':
        return 'bg-red-100 border-l-4 border-red-500';
      case 'moyenne':
        return 'bg-yellow-100 border-l-4 border-yellow-500';
      case 'faible':
        return 'bg-green-100 border-l-4 border-green-500';
      default:
        return 'bg-gray-100 border-l-4 border-gray-500';
    }
  };

  const formaterDate = (dateISO: string) => {
    return new Date(dateISO).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getIconeTypeDocument = (type: string) => {
    switch (type) {
      case 'rapport': return '📄';
      case 'ordonnance': return '📋';
      case 'certificat': return '🏥';
      default: return '📁';
    }
  };

  const getLibelleTypeDocument = (type: string) => {
    switch (type) {
      case 'rapport': return 'Rapport médical';
      case 'ordonnance': return 'Ordonnance';
      case 'certificat': return 'Certificat médical';
      default: return 'Document';
    }
  };

  const telechargerFichier = (nomFichier: string) => {
    alert(`Téléchargement de ${nomFichier}... (action simulée)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="mb-12">
          <div className="flex items-center gap-5">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUT4NhltYojT7X27fXXc4G_B4uljKUogHGZg&s"
                alt="Logo Médical"
                className="w-16 h-16 object-contain rounded-lg bg-white p-2 shadow-md border border-blue-100"
              />
            </motion.div>
            {/* Titres */}
            <div className="space-y-3">
              <motion.h1
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight"
              >
                Dossier Médical
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-gray-600 font-medium pb-4 border-b border-gray-200"
              >
                Historique complet de vos consultations médicales
              </motion.p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher une consultation, un médecin..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={termeRecherche}
                onChange={(e) => setTermeRecherche(e.target.value)}
              />
            </div>
            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={periode}
              onChange={(e) => setPeriode(e.target.value as any)}
            >
              <option value="tous">Toutes périodes</option>
              <option value="1mois">1 mois</option>
              <option value="6mois">6 mois</option>
            </select>
          </div>
        </div>

        {/* Liste des dossiers */}
        {chargement ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : dossiersFiltres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune consultation trouvée</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dossiersFiltres.map((dossier) => (
              <motion.div
                key={dossier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`rounded-lg shadow-md overflow-hidden ${getCouleurUrgence(dossier.urgence)}`}
              >
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setCarteDeveloppee(carteDeveloppee === dossier.id ? null : dossier.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl text-blue-500">
                        <FaStethoscope />
                      </div>
                      <div>
                        <h2 className="font-bold text-blue-600">{dossier.titre}</h2>
                        <p className="text-sm text-gray-500">{formaterDate(dossier.date)}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      {carteDeveloppee === dossier.id ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-700">{dossier.medecin}</p>
                    <span className="inline-block mt-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      Consultation
                    </span>
                  </div>
                </div>

                {carteDeveloppee === dossier.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 border-t border-gray-200"
                  >
                    <div className="pt-3">
                      <p className="text-gray-700 mb-4">{dossier.details}</p>
                      
                      {dossier.fichiers.length > 0 && (
                        <div>
                          <h3 className="font-medium text-gray-700 mb-2">Documents associés :</h3>
                          <ul className="space-y-2">
                            {dossier.fichiers.map((fichier, index) => (
                              <li key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                <div className="flex items-center">
                                  <span className="mr-2">{getIconeTypeDocument(fichier.type)}</span>
                                  <span className="text-sm">
                                    {getLibelleTypeDocument(fichier.type)} : {fichier.nom}
                                  </span>
                                </div>
                                <button
                                  onClick={() => telechargerFichier(fichier.nom)}
                                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                                >
                                  <FiDownload className="mr-1" /> Télécharger
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DossierMedicale;