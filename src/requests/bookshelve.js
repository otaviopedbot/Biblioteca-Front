import axios from "axios";

const url = import.meta.env.VITE_APIURL

export const getAllBookshelves = async () => {
    try {
        const response = await axios.get(`${url}/bookshelves`);
        return response.data
    } catch (error) {
        console.log("Error geting data:", error);
        throw error;
    }
};


export const getBookshelve = async (id) => {
    try {
        const response = await axios.get(`${url}/bookshelves/${id}`);
        return response.data[0];
    } catch (error) {
        console.log('Error geting data:', error);
        throw error;
    }
};


export const postBookshelve = async (name) => {
    try {
        await axios.post(`${url}/bookshelves`, { 'name': name });
    } catch (error) {
        console.log("Error posting data:", error);
        throw new error;
    }
};


export const updateBookshelve = async (id, name) => {
    try {
        await axios.put(`${url}/bookshelves/${id}`, { 'name': name });
    } catch (error) {
        console.log("Error updating data:", error);
        throw new error;
    }

}


export const deleteBookshelve = async (id) => {
    try {
        await axios.delete(`${url}/bookshelves/${id}`);
    } catch (error) {
        console.log("Error deleting data:", error);
        throw new error;
    }

}