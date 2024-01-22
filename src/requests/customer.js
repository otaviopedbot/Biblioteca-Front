import axios from "axios";

const url = import.meta.env.VITE_APIURL

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${url}/customers`);
        return response.data
    } catch (error) {
        console.log("Error geting data:", error.response.data);
        throw new error;
    }
};


export const getCustomer = async (id) => {
    try {
        const response = await axios.get(`${url}/customers/${id}`);
        return response.data[0];
    } catch (error) {
        console.log('Error getting data:', error.response.data);
        throw new error;
    }
};


export const postCustomer = async (name, phone, adress) => {
    try {
        await axios.post(`${url}/customers`, { 
            'name': name,
            'phone': phone,
            'adress': adress,
        });
    } catch (error) {
        console.log("Error posting data:", error.response.data);
        throw new error;
    }
};


export const updateCustomer = async (id, name, phone, adress) => {
    try {
        await axios.put(`${url}/customers/${id}`, { 
            'name': name,
            'phone': phone,
            'adress': adress,
        });
    } catch (error) {
        console.log("Error updating data:", error.response.data);
        throw new error;
    }

}


export const deleteCustomer = async (id) => {
    try {
        await axios.delete(`${url}/customers/${id}`);
    } catch (error) {
        console.log("Error deleting data:", error.response.data);
        throw new error;
    }

}