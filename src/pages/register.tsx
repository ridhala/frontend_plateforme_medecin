import { useNavigate } from 'react-router-dom';
import RegisterContainer from '../components/register/RegisterContainer'; 
import { useState } from 'react';

function Register() {
  const navigate = useNavigate(); 

    const [success, setSuccess] = useState(false);

  const handleRegisterSuccess =async () => {
    console.log('Registration successful!');
    setSuccess(true);

    setTimeout(async () => {
      await navigate("/login");
      setSuccess(false); 
    }, 3000)

  };
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Registration Successful!</h2>
          <h2 className='text-2xl font-bold'>Please check your email to verify your account.</h2>
          <p className='text-xl font-semibold'>You will be redirected to login page shortly...</p>
          </div>
      </div>
    );
  }
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      style={{
        backgroundImage: `url(https://etimg.etb2bimg.com/thumb/msid-91574236,imgsize-130648,width-1200,height=765,overlay-ethealth/health-it/how-do-technology-and-healthcare-go-hand-in-hand.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
     

<div >
  <RegisterContainer onRegisterSuccess={handleRegisterSuccess} />
</div>
    </div>
  );
}

export default Register;