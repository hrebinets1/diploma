import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/login-register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
    
        if (password !== confirmPassword) {
            setError('Паролі не співпадають');
            return;
        }
    
        const userData = {
            username,
            email,
            password,
        };
    
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (response.ok) {
                window.alert('Реєстрація пройшла успішно!');
                navigate('/login');  
            } else {
                const data = await response.json();
                if (data.username) {
                    setError(data.username); 
                } else if (data.email) {
                    setError(data.email);  
                } else {
                    setError('Не вдалося зареєструватись.');
                }
            }
        } catch (err) {
            setError('Неправильний формат даних.');
        }
    };

    return (
        <div className='container'>
            <h1>Реєстрація</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label>Впишіть ім'я: </label>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label>Впишіть електронну пошту: </label>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Впишіть пароль: </label>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label>Продублюйте пароль: </label>
                <input
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p></p>
                <button type='submit'>Зареєструватись</button>
                <div className='form-footer'>
                    <Link to='/login'>Вже є акаунт? Авторизуйтесь!</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
