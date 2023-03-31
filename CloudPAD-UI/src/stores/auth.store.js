import { defineStore } from 'pinia'
import { router } from '../router';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(JSON.parse(sessionStorage.getItem('token')));
  const returnUrl = ref(null);

  async function setSession(sessionToken) {
    try {
      // update pinia state
      token.value = sessionToken;

      // store user details and jwt in local storage to keep user logged in between page refreshes
      sessionStorage.setItem('token', JSON.stringify(token.value));

      // redirect to previous url or default to home page
      router.push(returnUrl.value || '/');
    } catch (error) {
      console.log('login error = ', error);
    }
  }

  function logout() {
    this.token = null;
    sessionStorage.removeItem('token');
    router.push('/login');
  }

  return { token, returnUrl, setSession, logout }
})
