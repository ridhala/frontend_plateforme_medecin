// DossierMedicale.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDownload, FiChevronDown, FiChevronUp, FiFile } from 'react-icons/fi';
import { FaStethoscope, FaPills, FaFlask } from 'react-icons/fa';

interface MedicalRecord {
  id: string;
  date: string;
  type: 'consultation' | 'lab' | 'prescription';
  title: string;
  details: string;
  doctor: string;
  files: string[];
  urgency: 'low' | 'medium' | 'high';
}

const DossierMedicale: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'consultation' | 'lab' | 'prescription'>('all');
  const [dateRange, setDateRange] = useState<'all' | '1month' | '6months'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const mockRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2023-06-15T09:30:00Z',
      type: 'consultation',
      title: 'Annual Checkup',
      details: 'Patient reported occasional headaches. Blood pressure slightly elevated.',
      doctor: 'Dr. Sarah Johnson',
      files: ['report1.pdf', 'bloodwork.pdf'],
      urgency: 'medium'
    },
    {
      id: '2',
      date: '2023-05-20T14:15:00Z',
      type: 'lab',
      title: 'Blood Test Results',
      details: 'Complete blood count shows normal ranges. Cholesterol levels slightly high.',
      doctor: 'Dr. Michael Chen',
      files: ['blood_results.pdf'],
      urgency: 'low'
    },
    {
      id: '3',
      date: '2023-04-10T11:00:00Z',
      type: 'prescription',
      title: 'Antibiotics Prescription',
      details: 'Prescribed amoxicillin for sinus infection. 500mg every 8 hours for 7 days.',
      doctor: 'Dr. Emily Rodriguez',
      files: ['prescription.pdf'],
      urgency: 'high'
    },
    {
      id: '15',
      date: '2023-01-10T16:45:00Z',
      type: 'consultation',
      title: 'Consultation dermatologique',
      details: 'Examen d\'une lésion cutanée suspecte sur l\'épaule gauche. Diagnostic : kératose séborrhéique bénigne. Pas de traitement nécessaire mais surveillance annuelle recommandée.',
      doctor: 'Dr. Emma Dermat',
      files: ['compte_rendu_dermatologie.pdf', 'photos_lesion.pdf'],
      urgency: 'low'
    },
    {
      id: '13',
      date: '2023-03-18T10:15:00Z',
      type: 'consultation',
      title: 'Suivi diabète',
      details: 'Contrôle glycémique satisfaisant sous traitement. HbA1c à 6.2%. Adaptation des doses d\'insuline : réduire la dose du soir de 2 unités. Prochain contrôle dans 3 mois.',
      doctor: 'Dr. Laurent Diab',
      files: ['rapport_diabete.pdf', 'ordonnance_diabete.pdf'],
      urgency: 'medium'
    },
    {
      id: '17',
      date: '2023-07-05T08:45:00Z',
      type: 'lab',
      title: 'Bilan thyroïdien complet',
      details: 'TSH: 2.1 mUI/L (normal), T4 libre: 14 pmol/L (normal), anticorps anti-TPO: négatif. Bilan normal, pas d\'évidence d\'hypo/hyperthyroïdie ou thyroïdite auto-immune. Aucun ajustement thérapeutique nécessaire.',
      doctor: 'Laboratoire Central BioLab',
      files: ['resultats_thyroide.pdf', 'recommandations_thyroide.pdf'],
      urgency: 'low'
    }
  ];

  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecords(mockRecords);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         record.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    
    const recordDate = new Date(record.date);
    const now = new Date();
    
    if (dateRange === '1month') {
      const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
      return matchesSearch && matchesType && recordDate >= oneMonthAgo;
    } else if (dateRange === '6months') {
      const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
      return matchesSearch && matchesType && recordDate >= sixMonthsAgo;
    }
    
    return matchesSearch && matchesType;
  });

  const getRecordIcon = (type: MedicalRecord['type']) => {
    switch(type) {
      case 'consultation': return <FaStethoscope className="text-blue-500" />;
      case 'prescription': return <FaPills className="text-teal-500" />;
      case 'lab': return <FaFlask className="text-purple-500" />;
      default: return <FaStethoscope className="text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: MedicalRecord['urgency']) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 border-l-4 border-red-500';
      case 'medium': return 'bg-yellow-100 border-l-4 border-yellow-500';
      case 'low': return 'bg-green-100 border-l-4 border-green-500';
      default: return 'bg-gray-100 border-l-4 border-gray-500';
    }
  };

  const formatDate = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDownload = (fileName: string) => {
    alert(`Downloading ${fileName}... (mock action)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header avec logo et espace structuré */}
{/* Section Header avec logo personnalisé */}
<div className="mb-12">
  <div className="flex items-center gap-5">
    {/* Logo médical externe */}
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

    {/* Titres avec espacement amélioré */}
    <div className="space-y-3"> {/* Augmentation de l'espace vertical */}
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
        className="text-lg md:text-xl text-gray-600 font-medium pb-4 border-b border-gray-200" /* Bordure et espace ajoutés */
      >
        Votre historique de santé complet, sécurisé et accessible
      </motion.p>
    </div>
  </div>
</div>
        
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
            >
              <option value="all">Tous les types</option>
              <option value="consultation">Consultation</option>
              <option value="lab">Laboratoire</option>
              <option value="prescription">Prescription</option>
            </select>
            
            <select
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value as any)}
            >
              <option value="all">Toutes dates</option>
              <option value="1month">1 mois</option>
              <option value="6months">6 mois</option>
            </select>
          </div>
        </div>
        
        {/* Timeline */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun dossier trouvé</p>
          </div>
        ) : (
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 w-1 h-full bg-blue-200 transform -translate-x-1/2"></div>
            
            <div className="space-y-8">
              <AnimatePresence>
                {filteredRecords.map((record, index) => (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={`relative ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}
                  >
                    <div className={`flex ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className="hidden md:flex absolute left-1/2 h-4 w-4 rounded-full bg-blue-500 transform -translate-x-1/2 items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className={`w-full md:w-96 rounded-xl shadow-lg overflow-hidden ${getUrgencyColor(record.urgency)}`}
                      >
                        <div 
                          className="p-4 cursor-pointer"
                          onClick={() => setExpandedCard(expandedCard === record.id ? null : record.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-center space-x-3">
                              <div className="text-xl">
                                {getRecordIcon(record.type)}
                              </div>
                              <div>
                                <h2 className="font-bold text-blue-600">{record.title}</h2>
                                <p className="text-sm text-gray-500">{formatDate(record.date)}</p>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              {expandedCard === record.id ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                          </div>
                          
                          <div className="mt-2">
                            <p className="text-sm text-gray-700">{record.doctor}</p>
                          </div>
                        </div>
                        
                        {expandedCard === record.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-4 pb-4"
                          >
                            <div className="border-t border-gray-200 pt-3">
                              <p className="text-gray-700 mb-4">{record.details}</p>
                              
                              {record.files.length > 0 && (
                                <div>
                                  <h3 className="font-medium text-gray-700 mb-2">Fichiers:</h3>
                                  <ul className="space-y-2">
                                    {record.files.map((file, i) => (
                                      <li key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                        <div className="flex items-center">
                                          <FiFile className="text-gray-400 mr-2" />
                                          <span className="text-sm">{file}</span>
                                        </div>
                                        <button 
                                          onClick={() => handleDownload(file)}
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
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DossierMedicale;