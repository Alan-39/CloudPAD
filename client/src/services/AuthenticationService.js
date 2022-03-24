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
    update (credentials) {
        return Api().post('auth/update', credentials);
    },
    checkAuth () {
        return Api().get('auth/checkAuth');
    }
}
