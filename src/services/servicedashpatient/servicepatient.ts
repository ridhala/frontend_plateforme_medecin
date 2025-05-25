import axios from "axios";

export const fetchspecialite = async (credential: string) => {
  const res = await axios.post("http://localhost:3000/authmedecin/specialite", {
    credential: credential
  });
  return res.data.listmedecin;
};

// affichage de la liste des rendezvous prises
export const listrendezvousprise = async () => {
  const res = await axios.get("http://localhost:3000/rendezvous/listrendezvous", {
    withCredentials:true,
   headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
  });
  return res.data;
};


export const createrendezvous = async (date_rendez_vous: string, medecin:string) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/rendezvous/addrdvpatient',
      { date_rendez_vous, medecin }, 
      {
        withCredentials: true, 
        headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('Erreur lors de la création du rendez-vous :', error.response?.data || error.message);
    throw error;
  }
};
export const nbsalle = async (id: string) => {
  const res = await axios.get(`http://localhost:3000/rendezvous/ensalle/${id}`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return res.data.count; 
};


