import axios from 'axios';
import { ENV_VARIABLES } from '../env';

export const minioService = {
  createBucket,
  listBuckets,
}

async function createBucket(data) {
  return await axios.post(`${ENV_VARIABLES.BACKEND_URL}/minio/make-bucket`, data);
}

async function listBuckets() {
  return await axios.get(`${ENV_VARIABLES.BACKEND_URL}/minio/list-buckets`);
}