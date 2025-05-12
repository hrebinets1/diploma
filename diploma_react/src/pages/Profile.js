import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // подключаем наш кастомный axios

const Profile = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('get_user');
                setUserData(response.data);
            } catch (error) {
                alert('Сесія закінчилася. Увійдіть ще раз.');
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <div style={{ width: '50%', margin: '0 auto', textAlign: 'center' }}>
            <h2>Головна сторінка профілю</h2>
            <h3>Вітаємо, {userData.first_name} {userData.last_name}!</h3>
            <div style={{ textAlign: 'left' }}>
                <p><strong>Електронна адреса:</strong> {userData.email}</p>
                <p><strong>Ім'я:</strong> {userData.first_name}</p>
                <p><strong>Прізвище:</strong> {userData.last_name}</p>
                <Link to="/" className="btn btn-primary">Перейти до тестування</Link>
            </div>
        </div>
    );
};

export default Profile;
