import axios from "axios";

const url = import.meta.env.VITE_APIURL

export const getAllRents = async () => {
    try {
        const response = await axios.get(`${url}/rents`);
        return response.data
    } catch (error) {
        console.log("Error geting data:", error.response.data);
        throw new error;
    }
};


export const getRent = async (id) => {
    try {
        const response = await axios.get(`${url}/rents/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error getting data:', error.response.data);
        throw new error;
    }
};


export const postRent = async (date, customer_id, book_id) => {
    try {
        await axios.post(`${url}/rents`, { 
            'date': date,
            'customer_id': customer_id,
            'book_id': book_id,
        });
    } catch (error) {
        console.log("Error posting data:", error.response.data);
        throw new error;
    }
};


export const updateRent = async (id, date, customer_id, book_id) => {
    try {
        await axios.put(`${url}/rents/${id}`, { 
            'date': date,
            'customer_id': customer_id,
            'book_id': book_id,
        });
    } catch (error) {
        console.log("Error updating data:", error.response.data);
        throw new error;
    }

}


export const deleteRent = async (id) => {
    try {
        await axios.delete(`${url}/rents/${id}`);
    } catch (error) {
        console.log("Error deleting data:", error.response.data);
        throw new error;
    }

}