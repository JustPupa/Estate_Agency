import axios from 'axios';

export const cryptCredentials = async (login, password) => {
    try {
        const request = {
            login: login,
            password: password
        };
        const response = await axios.post("https://localhost:7103/estate/login", request);
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
        return await axios.get('https://localhost:7103/estate/GetUserData', { params });
    } catch(e) {
        console.error(e.response.data);
    }
}

export const getEstatesByUid = async (uid) => {
    try {
        const params = {
            userid: uid
        }
        return await axios.get('https://localhost:7103/estate/getEstatesByUserId', { params });
    } catch(e) {
        console.error(e.response.data);
    }
}

export const getFiltered = async (category, min, max, room) => {
    try {
        const params = {
            category: category,
            minprice: min,
            maxprice: max,
            rooms: room
        }
        return await axios.get('https://localhost:7103/estate/getByFilter', { params });
    } catch(e) {
        console.error(e.response.data);
    }
}

export const toggleFavorite = async (userid, estateid) => {
    try {
        const request = {
            userid: userid,
            estateid: estateid
        };
        return await axios.post("https://localhost:7103/estate/toggleFavorite", request);;
    } catch(e) {
        console.error(e);
    }
}

export const removePhoto = async (estateid, photourl) => {
    try {
        const request = { estateid, photourl };
        return await axios.post("https://localhost:7103/estate/removePhoto", request);;
    } catch(e) {
        console.error(e);
    }
}

export const saveCard = async (estateid, description, address, price, rooms, categoryid, size) => {
    try {
        const request = { estateid, description, address, price, rooms, categoryid, size };
        return await axios.post("https://localhost:7103/estate/saveEstate", request);;
    } catch(e) {
        console.error(e);
    }
}

export const deleteCard = async (estateid) => {
    try {
        const request = { estateid };
        return await axios.post("https://localhost:7103/estate/removeEstate", request);;
    } catch(e) {
        console.error(e);
    }
}

export const createCard = async (uid, description, address, price, rooms, category, size) => {
    try {
        const request = { uid, description, address, price, rooms, category, size };
        return await axios.post("https://localhost:7103/estate/createEstate", request);;
    } catch(e) {
        if (e.status === undefined) {
            return {
                status: 500
            }
        }
        return e;
    }
}

export const AddPhotoToEstate = async (estateid, photourl) => {
    try {
        const request = { estateid, photourl };
        return await axios.post("https://localhost:7103/estate/addPhoto", request);;
    } catch(e) {
        console.error(e);
    }
}

export const GetPhotosByEstate = async (estateid) => {
    try {
        const params = {
            estateid
        }
        return await axios.get('https://localhost:7103/estate/getPhotosByEstate', { params });
    } catch(e) {
        console.error(e);
    }
}

export const CreateUser = async (login, username, password) => {
    try {
        const request = { login, username, password };
        return await axios.post("https://localhost:7103/estate/createUser", request);;
    } catch(e) {
        console.error(e);
    }
}