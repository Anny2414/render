import axios from "axios";
import { Navigate } from "react-router-dom";

const apiUrl = "http://127.0.0.1:8000/yourburger"; 

export const Login = async (username, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login/`, { username, password });
    const token = response.data.token.access;
    const name = response.data.name;
    localStorage.setItem('token', token);
    localStorage.setItem('name', name); 
    
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
