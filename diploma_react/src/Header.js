import React, { useState } from 'react';
import './css/header.css';
import logo from './images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-logo">
                <img className="img" src={logo} alt="Лого" />
                <Link to='/' className="header-title">Веб-застосунок</Link>
            </div>

            <nav className={`header-nav ${isOpen ? "active" : ""}`}>
                <Link to='/login'>Login</Link>
                <Link to='/register'>Register</Link>
                <Link to='/vocabulary'>Vocabulary</Link>
                <Link to='/skills'>Skills</Link>
                <Link to='/grammar'>Grammar</Link>
            </nav>

            <button className='header-button' onClick={() => setOpen(!isOpen)}>
                ☰
            </button>
        </header>
    );
}

export default Header;
