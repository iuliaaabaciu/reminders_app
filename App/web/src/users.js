import axios from 'axios';

export const register = (firstName, lastName, email, password) => 
  axios.post('http://localhost:8080/register', { firstName, lastName, email, password });

export const login = async (email, password) => {
  const result = await axios.post('http://localhost:8080/login', { email, password });  
  return result.data;
}