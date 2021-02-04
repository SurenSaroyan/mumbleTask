import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8000';


const login = async () => {
    const user = axios.post(`${BASE_URL}/auth/login`);
    console.log({user});
    return user
}
const registerUser = async (formData) => {
    const data = await axios.post(`${BASE_URL}/leads/createLeads`, formData);
    console.log({data});
}

export default {
    login,
    registerUser
}

