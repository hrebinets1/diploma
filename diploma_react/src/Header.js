import React, { useState, useContext } from 'react';
import './css/header.css';
import logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './context/AuthContext';

const Header = () => {
    const [isOpen, setOpen] = useState(false);
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
                        <Link to='/login'>Login</Link>
                        <Link to='/register'>Register</Link>
                    </>
                ) : (
                    <>
                        <Link to='/profile'>Профіль</Link>
                        <span onClick={handleLogout} className="header-logout" style={{ textDecoration: 'underline' }}>Logout</span>
                    </>
                )}
                <Link to='/vocabulary'>Vocabulary</Link>
                <Link to='/skills'>Skills</Link>
                <Link to='/grammar'>Grammar</Link>
            </nav>

            <button className='header-button' onClick={() => setOpen(!isOpen)}>
                ☰
            </button>
        </header>
    );
};

export default Header;
