import axios from "axios";

const url = import.meta.env.VITE_APIURL

export const login = async (email, password) => {
    try {
        await axios.post(`${url}/users/login`, { 
            'email': email,
            'password': password,
        });
    } catch (error) {
        console.log("Error posting data:", error);
        throw new error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`);
        return response.data
    } catch (error) {
        console.log("Error geting data:", error.response.data);
       throw new error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${url}/users/${id}`);
        return response.data[0];
    } catch (error) {
        console.log('Error getting data:', error.response.data);
       throw new error;
    }
};

export const postUser = async (username, email, password) => {
    try {
        await axios.post(`${url}/users`, { 
            'username': username,
            'email': email,
            'password': password,
        });
    } catch (error) {
        console.log("Error posting data:", error);
        throw new error;
    }
};

export const updateUser = async (id, username, email, password) => {
    try {
        await axios.put(`${url}/users/${id}`, { 
            'username': username,
            'email': email,
            'password': password,
        });
    } catch (error) {
        console.log("Error updating data:", error.response.data);
        throw new error;
    }

}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${url}/users/${id}`);
    } catch (error) {
        console.log("Error deleting data:", error.response.data);
        throw new error;
    }

}