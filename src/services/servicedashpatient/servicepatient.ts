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
