import axios from 'axios';

export const OnLogin = async (login, password) => {
    try {
        const request = {
            login: login,
            password: password
        };
        var response = await axios.post("https://localhost:7103/specs/login", request);
        return response;
    } catch(e) {
        console.error(e);
    }
}

export const Authorize = async (login, password, key) => {
    try {
        const request = {
            elogin: login,
            epassword: password,
            cookiekey: key
        }
        var response = await axios.post('https://localhost:7103/specs/authorize', request);
        return response;
    } catch(e) {
        console.error(e);
    }
}

export const CreateSpec = async (note) => {
    try {
        var response = await axios.post("https://localhost:7103/specs", note);
        return response.status;
    } catch(e) {
        console.error(e);
    }
}