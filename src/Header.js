import React from 'react'
import './css/main.css'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';

function Header(){
    return(
        <header className='header'>
            <nav className='header-nav'>
            <ul>    
                <li><img className="img" src={logo} alt="Лого" style={{ height: '20px' }}></img></li>
                <li><Link to='/'>Сайт</Link></li>
                <li><Link to='/about'>Про нас</Link></li>
            </ul>
            </nav>
        </header>
       
    );
}

export default Header;