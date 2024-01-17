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
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [url]);

    return data;
};


export const getAuthor = (id) => {
    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(url + '/authors/' + id);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [url]);

    return data;
};



export const postAuthor = async (name) => {
  try {
    const response = await axios.post(url + '/authors', { 'name': name });
  } catch (error) {
    console.error("Error posting data:", error);
  }
};
