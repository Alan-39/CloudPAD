import { defineStore } from 'pinia'
import { authService } from '../services/auth.service';
import { router } from '../router';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: JSON.parse(sessionStorage.getItem('token')),
    returnUrl: null,
  }),
  actions: {
    async setSession(token) {
      try {
        // update pinia state
        this.token = token;

        // store user details and jwt in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('token', JSON.stringify(token));

        // redirect to previous url or default to home page
        router.push(this.returnUrl || '/');
      } catch (error) {
        console.log('login error = ', error);
      }
    },
    logout() {
      this.token = null;
      sessionStorage.removeItem('token');
      router.push('/login');
    }
  }
})
