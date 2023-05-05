import axios from 'axios'

export const getUsers = () => {
    return axios.get('http://127.0.0.1:8000/users/api/v1/users/')
}