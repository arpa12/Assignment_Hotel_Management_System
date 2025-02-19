import axios from 'axios';

// Create an Axios instance
const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Attach Authorization Token to Requests (If Logged In)
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Set Content-Type dynamically
        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data"; // ✅ For file uploads
        } else {
            config.headers["Content-Type"] = "application/json"; // ✅ Default for JSON
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Logout Function
export const logoutUser = async () => {
    try {
        await API.post("/logout"); // ✅ Call the logout API
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        window.location.href = "/login"; // ✅ Redirect to login after logout
    } catch (error) {
        console.error("Logout Error:", error.response?.data);
    }
};

export default API;
