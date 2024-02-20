import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postReview = async (bookId, user_id, body, rating) => {
    try {
        await axios.post(`${url}/books/${bookId}/reviews`, {
            'user_id': user_id,
            'body': body,
            'rating': rating,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getReview = async (bookId, page, pageSize) => {
    try {
        let response = ''

        if (page && pageSize) {
            response = await axios.get(`${url}/books/${bookId}/reviews?page=${page}&pageSize=${pageSize}`, { headers: authHeader() });
        } else {
            response = await axios.get(`${url}/books/${bookId}/reviews`, { headers: authHeader() });
        }

        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const updateReview = async (bookId, userId, body, rating) => {
    try {
        await axios.put(`${url}/books/${bookId}/reviews/${reviewId}`, {
            'userId': userId,
            'body': body,
            'rating': rating,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteReview = async (bookId, reviewId) => {
    try {
        await axios.delete(`${url}/books/${bookId}/reviews/${reviewId}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}