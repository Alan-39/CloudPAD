import Api from '@/services/AxiosSetup'

export default {
    register (credentials) {
        return Api().post('auth/register', credentials);
    },
    login (credentials) {
        return Api().post('auth/login', credentials);
    },
    logout () {
        return Api().get('auth/logout');
    },
    checkAuth () {
        return Api().get('auth/checkAuth');
    }
}
