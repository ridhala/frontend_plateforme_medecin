import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function ActivationPage() {
  const { activationcode } = useParams();
  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    axios
      .post(`http://localhost:3000/authmedecin/verifmedecin/${activationcode}`)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [activationcode]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 text-center shadow-lg">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <Loader2 className="h-16 w-16 animate-spin text-blue-500" />
            <p className="mt-4 text-lg font-semibold text-gray-700">
              Activation en cours...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h2 className="mt-4 text-2xl font-bold text-green-600">
              Activation réussie !
            </h2>
            <p className="mt-2 text-gray-600">Votre compte a été activé avec succès.</p>
            <a href="/login" className="mt-4 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Se connecter
            </a>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
            <XCircle className="h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-red-600">Échec de l'activation</h2>
            <p className="mt-2 text-gray-600">Code d'activation invalide ou expiré.</p>
            <a href="/resend" className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
              Renvoyer l'email
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
