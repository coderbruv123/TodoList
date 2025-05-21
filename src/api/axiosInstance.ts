import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:7112",
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const user = localStorage.getItem("user");
        const token = user ? JSON.parse(user) : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => console.log(error)
);

export default axiosInstance;