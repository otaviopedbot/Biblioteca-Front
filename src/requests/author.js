import axios from "axios";
import authHeader from "../services/auth-header";

const url = import.meta.env.VITE_APIURL

export const getAllAuthors = async () => {
    try {
        const response = await axios.get(`${url}/authors`, { headers: authHeader() });
        return response.data
    } catch (error) {
        console.log("Error geting data:", error.response.data);
        throw new error;
    }
};


export const getAuthor = async (id) => {
    try {
        const response = await axios.get(`${url}/authors/${id}`);
        return response.data[0];
    } catch (error) {
        console.log('Error getting data:', error.response.data);
        throw new error;
    }
};


export const postAuthor = async (name) => {
    try {
        await axios.post(`${url}/authors`, { 'name': name });
    } catch (error) {
        console.log("Error posting data:", error.response.data);
        throw new error;
    }
};


export const updateAuthor = async (id, name) => {
    try {
        await axios.put(`${url}/authors/${id}`, { 'name': name });
    } catch (error) {
        console.log("Error updating data:", error.response.data);
        throw new error;
    }

}


export const deleteAuthor = async (id) => {
    try {
        await axios.delete(`${url}/authors/${id}`);
    } catch (error) {
        console.log("Error deleting data:", error.response.data);
        throw new error;
    }

}