import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    useEffect(() => {
        document.title = "Реєстрація";
    }, [] );
    
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault(); 
        navigate("/");
    }

    return (
        <div className='container'>
            <h1>Реєстрація!</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label>Впишіть ім'я: </label>
                <input type='text' required/>
                <label>Впишіть електронну пошту: </label>
                <input type='email' required/>
                <label>Впишіть пароль: </label>
                <input type='password' required/>
                <label>Продублюйте пароль: </label>
                <input type='password' required/>
                <p></p>
                <button type='submit'>Зареєструватись</button>
                <div className='form-footer'>
                    <Link to='/login'>Вже є акаунт? Авторизуйтесь!</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
