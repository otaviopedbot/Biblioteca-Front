import axios from "axios";

const API_URL = import.meta.env.VITE_APIURL;

const Register = (username, email, password) => {
  return axios
    .post(`${API_URL}/users/register`, {
      username,
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const Login = (email, password) => {
  return axios
    .post(`${API_URL}/users/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const Logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  Register,
  Login,
  Logout,
  getCurrentUser,
};

export default authService;