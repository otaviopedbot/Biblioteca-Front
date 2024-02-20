import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postFavorite = async (userId, bookId) => {
    try {
        await axios.post(`${url}/users/${userId}/favorites`, { 
            'book_id': bookId,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getFavorite = async (userId) => {
    try {
        const response = await axios.get(`${url}/users/${userId}/favorites`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteFavorite = async (userId, id) => {
    try {
        await axios.delete(`${url}/users/${userId}/favorites/${id}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}