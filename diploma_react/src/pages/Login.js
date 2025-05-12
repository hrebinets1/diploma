import React, { useState, useEffect, useContext } from 'react';
import '../css/login-register.css';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; 

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        document.title = "Авторизація";
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8000/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Неправильний нікнейм користувача або пароль');
            }

            const data = await response.json();

            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            login(data); 

            navigate('/profile'); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='container'>
            <h1>Авторизація</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label>Впишіть ім'я: </label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Впишіть пароль: </label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit'>Авторизуватись</button>
                <div className='form-footer'>
                    <Link to='/register'>Немає акаунту? Зареєструйтесь!</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
