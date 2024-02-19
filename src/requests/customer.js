import axios from "axios";
import authHeader from "../services/authHeader";
import authHeaderAdmin from "../services/authHeaderAdmin";

const url = import.meta.env.VITE_APIURL

export const getAllCustomers = async (page, pageSize) => {
    try {
        let response = ''

        if (page && pageSize) {
            response = await axios.get(`${url}/customers?page=${page}&pageSize=${pageSize}`, { headers: authHeader() });
        } else {
            response = await axios.get(`${url}/customers`, { headers: authHeader() });
        }
        return response.data
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCustomer = async (id) => {
    try {
        const response = await axios.get(`${url}/customers/${id}`, { headers: authHeaderAdmin() });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const postCustomer = async (name, phone, adress) => {
    try {
        await axios.post(`${url}/customers`, { 
            'name': name,
            'phone': phone,
            'adress': adress,
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCustomer = async (id, name, phone, adress) => {
    try {
        await axios.put(`${url}/customers/${id}`, { 
            'name': name,
            'phone': phone,
            'adress': adress,
        }, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteCustomer = async (id) => {
    try {
        await axios.delete(`${url}/customers/${id}`, { headers: authHeaderAdmin() });
    } catch (error) {
        console.log(error);
        throw error;
    }
}