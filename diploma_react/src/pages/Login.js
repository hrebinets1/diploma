import React, { useEffect } from 'react';
import '../css/login-register.css';
import { Link } from 'react-router-dom';

const Login = () => {
    useEffect(() => {
        document.title = "Авторизація";
    }, []);

    return (
        <div className='container'>
            <h1>Авторизація</h1>
            <form className='form' action="">
                <label>Впишіть ім'я: </label>
                <input type='text' required />
                <label>Впишіть пароль: </label>
                <input type='password' required />
                <p></p>
                <button type='submit'>Авторизуватись</button>
                <div className='form-footer'>
                    <Link to='/register'>Немає акаунту? Зареєструйтесь!</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;