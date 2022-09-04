import axios from 'axios';
import { ENV_VARIABLES } from '../env';

export const authService = {
  login,
  register
}

async function login(data) {
  return await axios.post(`${ENV_VARIABLES.BACKEND_URL}/user/login`, data);
}

async function register(data) {
  return await axios.post(`${ENV_VARIABLES.BACKEND_URL}/user/register`, data);
}