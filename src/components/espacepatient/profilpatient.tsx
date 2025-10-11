import React, { useEffect, useState } from 'react';
import {
  IdentificationIcon,UserIcon,CalendarIcon,
  PhoneIcon,EnvelopeIcon,UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

const ProfilPatient: React.FC = () => {
const location = useLocation();
  const account = location.state.account
console.log(account)
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
          <span className='text-xl'><strong>CIN :</strong> {account?.cin_patient}</span>
        </div>

        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span className='text-xl'><strong>Nom :</strong> {account?.nom_patient}</span>
        </div>

        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span className='text-xl'><strong>Prénom :</strong> {account?.prenom_patient}</span>
        </div>

        <div className="flex items-center space-x-4">
          <UserIcon className="h-6 w-6 text-blue-500" />
          <span className='text-xl'><strong>Sexe :</strong> {account?.sex ?(account?.sex) :
           (<p>Le sexe n'a pas encore ajouté.</p>)}</span>
        </div>

        <div className="flex items-center space-x-4">
          <CalendarIcon className="h-6 w-6 text-blue-500" />
          <span className='text-xl'><strong>Date de naissance :</strong> {account?.date_naissance ? (account?.date_naissance): 
          (<p>Le date de naissance n'a pas encore ajouté.</p>)}</span>
        </div>

        <div className="flex items-center space-x-4">
          <PhoneIcon className="h-6 w-6 text-blue-500" />
          <span className='text-xl'><strong>Téléphone :</strong> {account?.telephone}</span>
        </div>

        <div className="flex items-center space-x-4 md:col-span-2">
          <EnvelopeIcon className="h-6 w-6 text-blue-500" />
          <span className='text-xl'><strong>Email :</strong> {account?.email ? (account?.email) : 
          (<p>L'Email n'a pas encore ajouté.</p>)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilPatient;
