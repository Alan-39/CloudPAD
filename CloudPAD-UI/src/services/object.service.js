import axios from 'axios';
import { ENV_VARIABLES } from '../env';
import authHeader from './auth-header';

export const objectService = {
  listObject,
  uploadObject,
  downloadObject,
  deleteObject,
}

async function listObject(bucketName) {
  return await axios.get(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}`, { headers: authHeader() });
}

function uploadObject(formData) {
  return axios.post(`${ENV_VARIABLES.BACKEND_URL}/object/upload`, formData, { headers: authHeader() });
}

async function downloadObject(objectName, bucketName) {
  return await axios.get(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}/${objectName}`, { headers: authHeader() });
}

async function deleteObject(objectName, bucketName) {
  return await axios.delete(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}/${objectName}`, { headers: authHeader() });
}