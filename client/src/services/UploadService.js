import Api from '@/services/AxiosSetup'

export default {
    upload (data) {
        return Api().post('minio/upload', data)
    }
}
