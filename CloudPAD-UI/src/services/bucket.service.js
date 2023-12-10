import { ENV_VARIABLES } from '../env';
import authHeader from './auth-header';

export const bucketService = {
  makeBucket,
  listBuckets,
  removeBucket,
}

async function makeBucket(data) {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/bucket`, {
    method: 'POST',
    headers: {
      "Authorization": authHeader(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
  return { status: res.status, data: await res.json() };
}

async function listBuckets() {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/bucket`, {
    method: 'GET',
    headers: {
      "Authorization": authHeader(),
      "Content-Type": "application/json"
    },
  });
  return { status: res.status, data: await res.json() };
}

async function removeBucket(name) {
  const res = await fetch(`${ENV_VARIABLES.BACKEND_URL}/bucket/${name}`, {
    method: 'DELETE',
    headers: {
      "Authorization": authHeader(),
      "Content-Type": "application/json"
    },
  });
  return { status: res.status, data: await res.json() };
}