// src/pages/Support.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface SupportForm {
  nom: string;
  email: string;
  message: string;
}

const Support: React.FC = () => {
  const [form, setForm] = useState<SupportForm>({
    nom: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/support', form);
      setSuccess(true);
      setForm({ nom: '', email: '', message: '' });
    } catch (error) {
      alert("Erreur lors de l'envoi du message.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contacter le support technique</h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          ✅ Message envoyé avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          className="w-full border p-2 rounded"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Décrivez votre problème..."
          className="w-full border p-2 rounded"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Envoyer au support
        </button>
      </form>
    </div>
  );
};

export default Support;
