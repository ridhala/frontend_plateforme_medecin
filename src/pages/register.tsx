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
        backgroundImage: `url()`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Welcome Message Design with Shadow */}
     

<div >
  <RegisterContainer onRegisterSuccess={handleRegisterSuccess} />
</div>
    </div>
  );
}

export default Register;