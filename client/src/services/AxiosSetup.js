import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://localhost:3000/`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
        }
    })
}