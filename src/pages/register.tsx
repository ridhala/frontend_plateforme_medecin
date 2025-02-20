import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import RegisterContainer from '../components/register/RegisterContainer'; // Import the RegisterContainer component

function Register() {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle successful registration
  const handleRegisterSuccess = () => {
    console.log('Registration successful!');
    navigate('/login'); // Redirect to the login page after successful registration
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/9f/f7/d1/9ff7d1a690e7bf508eda106f9bc13dab.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Welcome Message Design with Shadow */}
      <div className="relative z-1 text-center mb-2 bg-opacity-75 p-5 rounded-lg shadow-2xl backdrop-blur-sm w-5/5 max-w-3xl">
  <h1 className="text-5xl font-bold text-gray-550 mb-3">
    Welcome Doctor in Your Clinic
  </h1>
  <p className="text-2xl text-gray-700">
    Manage your patients and appointments with ease.
  </p>
</div>

<div className="relative z-10 bg-white bg-opacity-75 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
  <RegisterContainer onRegisterSuccess={handleRegisterSuccess} />
</div>
    </div>
  );
}

export default Register;