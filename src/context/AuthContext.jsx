import React, { createContext, useState } from 'react';
import { login } from '../requests/user'; // Certifique-se de que a importação está correta
import { json } from 'react-router-dom'; // Corrija para JSON com maiúsculas

const api = import.meta.env.VITE_APIURL;

const Context = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  async function handleLogin(email, password) {
    try {
      const { data: { token } } = await login(email, password);

      localStorage.setItem('token', json.stringify(token)); // Corrija para JSON com maiúsculas
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      // Trate o erro de acordo com suas necessidades (exibir uma mensagem, redirecionar para uma página de erro, etc.)
    }
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin }}>
      {children}
    </Context.Provider>
  );
};

export { Context, AuthProvider };
