import React from 'react';

export default function Login() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/020/679/215/non_2x/technology-medical-background-medical-icons-modern-wallpaper-geometric-hexagon-vector.jpg)',
        backgroundSize: 'cover', // Ajuste l'image pour qu'elle couvre toute la page
        backgroundPosition: 'center', // Centre l'image horizontalement et verticalement
        backgroundRepeat: 'no-repeat', // Empêche la répétition de l'image
      }}
    >
      {/* Conteneur pour le titre */}
      <div className="w-full text-center mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold tracking-wide hover:text-blue-500 transition-colors duration-300 ease-in-out"
          style={{
            color: 'black',
          }}
        >
          WELCOME TO MED-PLATEFORME
        </h1>
      </div>

      {/* Conteneur principal centré */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm bg-white/80 p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <img
          alt="Your Company"
          src="https://i.pinimg.com/550x/7c/ea/0a/7cea0ad2b9054fb76972b3594d4e1261.jpg"
          className="mx-auto h-10 w-auto mb-6"
        />
        {/* Titre du formulaire */}
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-red-900">
          Sign in to your account
        </h2>

        {/* Formulaire de connexion */}
        <form action="#" method="POST" className="space-y-6 mt-6">
          {/* Champ CIN de médecin */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              CIN de médecin
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Lien d'inscription */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Register now
          </a>
        </p>
      </div>
    </div>
  );
}