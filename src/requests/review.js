import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const postReview = async (user_id, body, rating) => {
    try {
        await axios.post(`${url}/books`, { 
            'user_id': user_id,
            'body': body,
            'rating': rating,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getReview = async (id) => {
    try {
        const response = await axios.get(`${url}/books/${id}/reviews`, { headers: authHeader() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateReview = async (id, userId, body, rating) => {
    try {
        await axios.put(`${url}/books/${id}/reviews/${reviewId}`, { 
            'userId': userId,
            'body': body,
            'rating': rating,
        }, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteReview = async (reviewId, id) => {
    try {
        await axios.delete(`${url}/books/${id}/reviews/${reviewId}`, { headers: authHeader() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}