import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('access_token');
    const [sections, setSections] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Сторінка профілю";

        if (!isAuthenticated) {
            alert('Для перегляду сторінки профілю Вам необхідно виконати авторизацію.');
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const response = await axios.get('http://127.0.0.1:8000/api/get_user', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setSections(response.data);
            } catch (err) {
                if (err.response && err.response.status === 401) {

                    try {
                        const refreshToken = localStorage.getItem('refresh_token');
                        const refreshResponse = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
                            refresh: refreshToken
                        });
                        const newAccessToken = refreshResponse.data.access;
                        localStorage.setItem('access_token', newAccessToken);

                        const retryResponse = await axios.get('http://127.0.0.1:8000/api/get_user', {
                            headers: {
                                Authorization: `Bearer ${newAccessToken}`
                            }
                        });
                        setSections(retryResponse.data);
                    } catch (refreshError) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');
                        alert('Сесія закінчилася. Увійдіть ще раз.');
                        navigate('/login');
                    }
                } else {
                    setError('Не вдалося завантажити дані.');
                }
            }
        };

        fetchProfile();
    }, [isAuthenticated, navigate]);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Головна сторінка профілю</h2>
            <h3 style={{ textAlign: "center" }}>
                Вітаємо, {sections.first_name} {sections.last_name}!
            </h3>
            <Link to="/skills" className="btn btn-primary">Перейти до тестування</Link>
        </div>
    );
};

export default Profile;
