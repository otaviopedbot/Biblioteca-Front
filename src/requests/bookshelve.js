import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllBookshelves = async () => {
    try {
        const response = await axios.get(`${url}/bookshelves`, { headers: authHeader() });
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getBookshelve = async (id) => {
    try {
        const response = await axios.get(`${url}/bookshelves/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const postBookshelve = async (name) => {
    try {
        await axios.post(`${url}/bookshelves`, { 'name': name }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateBookshelve = async (id, name) => {
    try {
        await axios.put(`${url}/bookshelves/${id}`, { 'name': name }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const deleteBookshelve = async (id) => {
    try {
        await axios.delete(`${url}/bookshelves/${id}`, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }

}