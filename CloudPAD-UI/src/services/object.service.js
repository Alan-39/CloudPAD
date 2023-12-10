import { ENV_VARIABLES } from '../env';
import authHeader from './auth-header';

export const objectService = {
  listObject,
  uploadObject,
  downloadObject,
  deleteObject,
}

async function listObject(bucketName) {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}`, {
    method: 'GET',
    headers: {
      "Authorization": authHeader(),
      "Content-Type": "application/json"
    },
  });
  return { status: res.status, data: await res.json() };
}

async function uploadObject(data) {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/object/upload`, {
    method: 'POST',
    headers: {
      "Authorization": authHeader(),
    },
    body: data,
  });
  return { status: res.status, data: await res.json() };
}

async function downloadObject(objectName, bucketName) {  
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}/${objectName}`, {
    method: 'GET',
    headers: {
      "Authorization": authHeader(),
    },
  });
  return { data: await res.text() };
}

async function deleteObject(objectName, bucketName) {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/object/${bucketName}/${objectName}`, {
    method: 'DELETE',
    headers: {
      "Authorization": authHeader(),
    },
  });
  return { status: res.status, data: await res.json() };
}