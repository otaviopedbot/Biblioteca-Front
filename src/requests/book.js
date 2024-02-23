import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllBooks = async (page, pageSize) => {
    try {
        let response = ''

        if (page && pageSize) {
            response = await axios.get(`${url}/books?page=${page}&pageSize=${pageSize}`, { headers: authHeader() });
        } else {
            response = await axios.get(`${url}/books`, { headers: authHeader() });
        }

        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getBook = async (id) => {
    try {
        const response = await axios.get(`${url}/books/${id}`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const postBook = async (title, page, quantity, author_id, bookshelve_id, synopsis, cover) => {
    try {
        await axios.post(`${url}/books`, {
            'title': title,
            'page': page,
            'quantity': quantity,
            'author_id': author_id,
            'bookshelve_id': bookshelve_id,
            'synopsis': synopsis,
            'cover': cover
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateBook = async (id, title, page, quantity, author_id, bookshelve_id, synopsis, cover) => {
    try {
        await axios.put(`${url}/books/${id}`, {
            'title': title,
            'page': page,
            'quantity': quantity,
            'synopsis': synopsis,
            'author_id': author_id,
            'bookshelve_id': bookshelve_id,
            'cover': cover,
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const deleteBook = async (id) => {
    try {
        await axios.delete(`${url}/books/${id}`, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }

}