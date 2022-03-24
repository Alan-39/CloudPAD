import Api from '@/services/AxiosSetup'

export default {
    getCodes () {
        return Api().get('referral/getcode')
    },
    generateCode () {
        return Api().post('referral/gencode')
    },
    deleteCode (code) {
        return Api().post('referral/delcode', code)
    },
}
