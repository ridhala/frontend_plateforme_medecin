import React, { useState } from "react";
import { LoginFormadmin } from "../types/logintype";
import { loginadmin } from "../services/authentification/loginService";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [form, setForm] = useState<LoginFormadmin>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginadmin(form);
      console.log("Connexion réussie:", data.role);

      setTimeout(() => {
        setLoading(false);
        if (data.role === "admin") {
          navigate("/admindashboard");
        }
      }, 3000);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Erreur de connexion.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-950"
       /*style={{
      backgroundImage: ` url(https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2dlMmI3Ym9jdDgwcThneHpsbGt0Z3l0Z2FlMng3NTI3MmhqNmp4cyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l5JbspfwZ0yjHjlJ0K/giphy.webp)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center' }}    */ 
      >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Connexion Admin
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white font-semibold py-2 px-4 rounded-lg transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <span className="flex justify-center items-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Connexion...
            </span>
          ) : (
            "Se connecter"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
