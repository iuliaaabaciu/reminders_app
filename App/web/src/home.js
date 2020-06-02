import axios from 'axios';
import { getAuthToken } from './session';

export const home = async () => {
  const result = await axios.get('http://localhost:8080/home');

  return result.data;
}