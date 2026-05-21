import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL
    ? `${import.meta.env.VITE_BASE_URL}/api`
    : "/api";

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;
