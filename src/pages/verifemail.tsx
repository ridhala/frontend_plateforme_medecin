import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Success icon

function VerificationSuccess() {
  const navigate = useNavigate();

  // Redirect to login page after 5 seconds
  

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50"
      style={{
        backgroundImage: `url('https://media.tenor.com/5oA6W5zZ7ZAAAAAC/medical-heartbeat.gif')`, // Dynamic GIF background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay to improve readability */}
      <div className="absolute inset-0 bg-gray-100 backdrop-blur-sm"></div>

      {/* Success Message */}
      <div className="relative z-10 text-center bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border-t-4 border-green-500 max-w-md">
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Account Verified!
        </h1>
        <p className="text-gray-700 mb-6">
          Your account has been successfully verified. You will be redirected to
          the login page in a few seconds.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-md text-md font-semibold text-white bg-green-600 hover:bg-green-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}

export default VerificationSuccess;