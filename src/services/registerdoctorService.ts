import axios from 'axios';
export const registerDoctor = async (formData: FormData) => {
  const token = localStorage.getItem('token'); 


  try {
     
    const response = await axios.post('http://localhost:3000/authmedecin/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, 
        
      }
      
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
      
        throw new Error(error.response.data.message || 'An error occurred during registration.');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response received from the server.');
      } else {
        throw new Error(error.message);
      }
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};