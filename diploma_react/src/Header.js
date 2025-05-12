import React, { useContext } from 'react';
import './css/header.css';
import logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        if(window.confirm('Ви дійсно хочете вийти з акаунту?')) {
            logout();
            navigate('/');
        }
    };

    return (
        <header className="header">
            <div className="header-logo">
                <img className="img" src={logo} alt="Лого" />
                <Link to='/' className="header-title">Веб-застосунок</Link>
            </div>

            <nav className="header-nav">
                {!user ? (
                    <>
                        <Link to='/login'>Авторизація</Link>
                        <Link to='/register'>Реєстрація</Link>
                    </>
                ) : (
                    <>
                        <Link to='/profile'>Профіль</Link>
                        <span onClick={handleLogout} className="header-logout" style={{ textDecoration: 'underline' }}>Logout</span>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
