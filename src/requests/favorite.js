import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postFavorite = async (title, page, quantity, author_id, bookshelve_id) => {
    try {
        await axios.post(`${url}/books`, { 
            'title': title,
            'page': page,
            'quantity': quantity,
            'author_id': author_id,
            'bookshelve_id': bookshelve_id
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getFavorite = async (id) => {
    try {
        const response = await axios.get(`${url}/users/${id}/favorites`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
       throw error;
    }
};

export const updateFavorite = async (id, username, email, password, image, details) => {
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

export const deleteFavorite = async (userId, id) => {
    try {
        await axios.delete(`${url}/users/${userId}/favorites/${id}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}