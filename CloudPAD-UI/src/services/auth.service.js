import { ENV_VARIABLES } from '../env';
import authHeader from './auth-header';

export const authService = {
  login,
  register
}

async function login(data) {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: {
      "Authorization": authHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return { status: res.status, data: await res.json() };
}

async function register(data) {
  const res =  await fetch(`${ENV_VARIABLES.BACKEND_URL}/user/register`, {
    method: 'POST',
    headers: {
      "Authorization": authHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return { status: res.status, data: await res.json() };
}