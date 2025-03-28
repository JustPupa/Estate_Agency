import axios from 'axios';

export const cryptCredentials = async (login, password) => {
    try {
        const request = {
            login: login,
            password: password
        };
        const response = await axios.post("https://localhost:7103/specs/login", request);
        return response;
    } catch(e) {
        console.error(e);
    }
}

export const getUserData = async (login, password, key) => {
    try {
        const params = {
            elogin: login,
            epassword: password,
            cookiekey: key
        }
        return await axios.get('https://localhost:7103/specs/getUserData', { params });
    } catch(e) {
        console.error(e.response.data);
    }
}