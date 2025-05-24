import React, { useEffect, useState } from 'react';
import {
  IdentificationIcon,
  UserIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { addpatient } from '../../types/patienttype';

const ProfilPatient: React.FC = () => {
  const [patient, setPatient] = useState<addpatient | null>(null);

  useEffect(() => {
    const storedPatient = localStorage.getItem('patient');
    if (storedPatient) {
      setPatient(JSON.parse(storedPatient));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-12 bg-white rounded-2xl shadow-2xl mt-6">
      {/* Header */}
      <div className="flex items-center mb-8 space-x-6">
        <div className="bg-blue-100 p-4 rounded-full">
          <UserCircleIcon className="h-12 w-12 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Profil du Patient</h1>
          <p className="text-base text-gray-500">Informations personnelles enregistrées</p>
        </div>
      </div>

      {/* Infos patient */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-gray-700">
        <div className="flex items-center space-x-4">
          <IdentificationIcon className="h-6 w-6 text-blue-500" />
          <span><strong>CIN :</strong> {patient?.cin_patient}</span>
        </div>

        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span><strong>Nom :</strong> {patient?.nom_patient}</span>
        </div>

        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span><strong>Prénom :</strong> {patient?.prenom_patient}</span>
        </div>

        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span><strong>Sexe :</strong> {patient?.sex}</span>
        </div>

        <div className="flex items-center space-x-4">
          <CalendarIcon className="h-6 w-6 text-blue-500" />
          <span><strong>Date de naissance :</strong> {<div>15/06/2001</div>}</span>
        </div>

        <div className="flex items-center space-x-4">
          <PhoneIcon className="h-6 w-6 text-blue-500" />
          <span><strong>Téléphone :</strong> {patient?.telephone}</span>
        </div>

        <div className="flex items-center space-x-4 md:col-span-2">
          <EnvelopeIcon className="h-6 w-6 text-blue-500" />
          <span><strong>Email :</strong> {patient?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilPatient;
