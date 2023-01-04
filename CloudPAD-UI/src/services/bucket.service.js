import axios from 'axios';
import { ENV_VARIABLES } from '../env';
import authHeader from './auth-header';

export const bucketService = {
  makeBucket,
  listBuckets,
  removeBucket,
}

async function makeBucket(data) {
  return await axios.post(`${ENV_VARIABLES.BACKEND_URL}/bucket`, data, { headers: authHeader() });
}

async function listBuckets() {
  return await axios.get(`${ENV_VARIABLES.BACKEND_URL}/bucket`, { headers: authHeader() });
}

async function removeBucket(name) {
  return await axios.delete(`${ENV_VARIABLES.BACKEND_URL}/bucket/${name}`, { headers: authHeader() });
}