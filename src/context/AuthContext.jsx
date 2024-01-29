import React, { createContext, useState } from 'react'
import { login } from "../requests/user"
import { json } from 'react-router-dom';

const api = import.meta.env.VITE_APIURL

const Context = createContext();

const AuthProvider = ({ children }) => {

    const [authenticated, setAuthenticated] = useState(false)

    async function handleLogin(email, password) {
        const { data: {token} } = await login(email, password)

        localStorage.setItem('token', json.stringify(token))
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticated(true);
    }

    return (
        <Context.Provider value={{ authenticated, handleLogin }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }