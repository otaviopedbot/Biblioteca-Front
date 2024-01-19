import axios from "axios";

const url = import.meta.env.VITE_APIURL

export const getAllBooks = async () => {
    try {
        const response = await axios.get(`${url}/books`);
        return response.data
    } catch (error) {
        console.log("Error geting data:", error);
        throw error;
    }
};


export const getBook = async (id) => {
    try {
        const response = await axios.get(`${url}/books/${id}`);
        return response.data[0];
    } catch (error) {
        console.log('Erro ao obter autor:', error);
        throw error;
    }
};


export const postBook = async (title, page, quantity, author_id, bookshelve_id) => {
    try {
        await axios.post(`${url}/books`, { 
            'title': title,
            'page': page,
            'quantity': quantity,
            'author_id': author_id,
            'bookshelve_id': bookshelve_id
        });
    } catch (error) {
        console.log("Error posting data:", error);
        throw new error;
    }
};


export const updateBook = async (id, title, page, quantity, author_id, bookshelve_id) => {
    try {
        await axios.put(`${url}/books/${id}`, { 
            'title': title,
            'page': page,
            'quantity': quantity,
            'author_id': author_id,
            'bookshelve_id': bookshelve_id
        });
    } catch (error) {
        console.log("Error updating data:", error);
        throw new error;
    }

}


export const deleteBook = async (id) => {
    try {
        await axios.delete(`${url}/books/${id}`);
    } catch (error) {
        console.log("Error deleting data:", error);
        throw new error;
    }

}