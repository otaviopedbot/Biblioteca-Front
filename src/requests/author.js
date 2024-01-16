import { useState, useEffect } from "react";
import axios from "axios";


export const getAllAuthors = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APIURL + '/authors');
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [import.meta.env.VITE_APIURL]);

    return data;
};




export const getAuthor = (id) => {
    const [data, setData] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_APIURL + '/authors/' + id);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getData();
    }, [import.meta.env.VITE_APIURL]);

    return data;
};
