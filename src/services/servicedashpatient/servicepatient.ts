import axios from "axios";

export const fetchspecialite = async (credential: string) => {
  const res = await axios.post("http://localhost:3000/authmedecin/specialite", {
    credential: credential
  });
  return res.data.listmedecin;
};
