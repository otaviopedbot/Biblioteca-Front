import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${url}/users`, { headers: authHeader() });
        return response.data
    } catch (error) {
        console.log(error);
       throw error;
    }
};

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${url}/users/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
       throw error;
    }
};

export const searchUser = async (username) => {
    try {
        const response = await axios.get(`${url}/users/search/${username}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
       throw error;
    }
};

export const updateUser = async (id, username, email, password, image, details) => {
    try {
        await axios.put(`${url}/users/${id}`, { 
            'username': username,
            'email': email,
            'password': password,
            'image': image,
            'details': details,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteUser = async (id) => {
    try {
        await axios.delete(`${url}/users/${id}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}