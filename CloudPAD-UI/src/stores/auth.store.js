import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: JSON.parse(sessionStorage.getItem('token')),
    returnUrl: null
  }),
  actions: {
    setSession(token) {
        this.token = token;
        sessionStorage.setItem('token', JSON.stringify(token));

        // return to previous page or default to homepage
        router.push(this.returnUrl || '/');
    },
    removeSession() {
        this.token = null;
        sessionStorage.removeItem('token');

        router.push('/login');
    }
  }
})
