import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401) {
            try {
                const refresh = localStorage.getItem('refresh_token');
                const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh });
                const newAccess = response.data.access;
                localStorage.setItem('access_token', newAccess);
                originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                const navigate = useNavigate();
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
