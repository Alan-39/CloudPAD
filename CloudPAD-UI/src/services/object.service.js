import axios from 'axios';
import { ENV_VARIABLES } from '../env';
import authHeader from './auth-header';

export const objectService = {
  listObject,
}

async function listObject(bucketName) {
  return await axios.get(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}`, { headers: authHeader() });
}
