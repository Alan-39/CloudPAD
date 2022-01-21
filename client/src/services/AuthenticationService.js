import Api from '@/services/AxiosSetup'

export default {
    register (credentials) {
        return Api().post('register', credentials)
    },
    login (credentials) {
        return Api().post('login', credentials)
    },
    logout () {
        return Api().get('logout')
    },
    checkAuth () {
        return Api().get('checkAuth')
    }
}
