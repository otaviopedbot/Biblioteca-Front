import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllAuthors = async (page, pageSize) => {
    try {
        let response = ''

        if (page && pageSize) {
            response = await axios.get(`${url}/authors?page=${page}&pageSize=${pageSize}`, { headers: authHeader() });
        } else {
            response = await axios.get(`${url}/authors`, { headers: authHeader() });
        }

        return response.data
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const getAuthor = async (id) => {
    try {
        const response = await axios.get(`${url}/authors/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postAuthor = async (name) => {
    try {
        await axios.post(`${url}/authors`, { 'name': name }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const updateAuthor = async (id, name) => {
    try {
        await axios.put(`${url}/authors/${id}`, { 'name': name }, { headers: authHeaderAdmin() });
    } catch (error) {
        throw error;
    }
}

export const deleteAuthor = async (id) => {
    try {
        await axios.delete(`${url}/authors/${id}`, { headers: authHeaderAdmin() });
    } catch (error) {
        throw error;
    }
}