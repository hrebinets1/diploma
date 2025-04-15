import React from 'react'
import './css/main.css'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header className='header'>
            <nav>
                <img src={logo} alt="Лого" style={{ height: '20px' }}></img>
                <Link to='/'>Сайт</Link>
                <Link to='/about'>Про нас</Link>
            </nav>
        </header>
       
    );
}

export default Header;