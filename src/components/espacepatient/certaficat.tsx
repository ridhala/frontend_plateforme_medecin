// components/CertificateGenerator.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface Appointment {
  patientName: string;
  doctorName: string;
  date: string;
  patientId?: string;
  doctorId?: string;
}

interface CertificateGeneratorProps {
  appointment?: Appointment;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ appointment }) => {
  const [formData, setFormData] = useState({
    patientName: appointment?.patientName || '',
    doctorName: appointment?.doctorName || '',
    date: appointment?.date || new Date().toISOString().split('T')[0],
    diagnosis: '',
    treatment: '',
    validity: '7' // Default 7 days validity
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/certaficat/generate-certificate',
        formData,
        { responseType: 'blob' }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${formData.patientName.replace(/\s+/g, '_')}_medical_certificate.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error('Error generating certificate:', err);
      setError('Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">Medical Certificate Generator</h2>
        <p className="text-gray-600">Generate official medical certificates for your patients</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Information */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Doctor Information */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Doctor Name</label>
            <input
              type="text"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Dr. Smith"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Validity */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Validity (days)</label>
            <select
              name="validity"
              value={formData.validity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter diagnosis details..."
          />
        </div>

        {/* Treatment */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Recommended Treatment</label>
          <textarea
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter treatment details..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isGenerating}
            className={`px-6 py-3 rounded-md text-white font-medium ${isGenerating ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'Download Certificate'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};