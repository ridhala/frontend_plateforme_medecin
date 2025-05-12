// services/messagerieService.ts
import axios from "axios";

export interface Message {
  _id?: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt?: string;
}

export const fetchMessages = async ( receiverId: string) => {
  const res = await axios.get(`http://localhost:3000/messagerie/history`, {
    params: {receiverId },
    withCredentials: true,
    headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
  });
  return res.data;
};

export const sendMessage = async (data: {
  senderId: string;receiverId: string; message: string;
}) => {
  const res = await axios.post(`http://localhost:3000/messagerie/send`, data,
    {    headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
}
  );
  return res.data;
};

export const fetchmedecin=async () => {
  const res = await axios.get(`http://localhost:3000/authmedecin/all`, {
  });
  return res.data;
};


export const fetchdiscussion = async () => {
  const res = await axios.get(`http://localhost:3000/messagerie/discussion`, {
    withCredentials: true,
    headers:{  Authorization: `Bearer ${localStorage.getItem('accessToken')}`}
  });
  return res.data;
};