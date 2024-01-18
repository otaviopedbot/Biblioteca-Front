import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_APIURL

export const getAllAuthors = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(url + '/authors');
                setData(response.data);
            } catch (error) {
                console.error("Error geting data:", error);
            }
        };

        getData();
    }, [url]);

    return data;
};


export const getAuthor = async (id) => {
    try {
      const response = await axios.get(`${url}/authors/${id}`);
      return response.data[0];
    } catch (error) {
      console.error('Erro ao obter autor:', error);
      throw error;
    }
  };


export const postAuthor = async (name) => {
    try {
        const response = await axios.post(url + '/authors', { 'name': name });
    } catch (error) {
        console.log("Error posting data:", error);
    }
};


export const updateAuthor = async (id, name) => {

    try {
        const response = await axios.put(url + '/authors/' + id, { 'name': name });
    } catch (error) {
        console.log("Error updating data:", error);
    }

}