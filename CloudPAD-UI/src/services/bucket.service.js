import axios from 'axios';
import { ENV_VARIABLES } from '../env';

export const bucketService = {
  makeBucket,
  listBuckets,
  removeBucket,
}

async function makeBucket(data) {
  return await axios.post(`${ENV_VARIABLES.BACKEND_URL}/bucket`, data);
}

async function listBuckets() {
  return await axios.get(`${ENV_VARIABLES.BACKEND_URL}/bucket`);
}

async function removeBucket(name) {
  return await axios.delete(`${ENV_VARIABLES.BACKEND_URL}/bucket/${name}`);
}