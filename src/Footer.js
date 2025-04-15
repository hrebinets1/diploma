import React from 'react'
import './css/main.css'
import logo from './images/logo.png'

function Footer(){
    return (
        <footer className="footer">
            <nav className='footer-nav'>
                <img className="img" src={logo} alt="Лого" style={{ height: '20px' }}></img>
                <a href='/'>Сайт</a>
            </nav>
            <p>Це підвал сайту!</p>
        </footer>
    );
}


export default Footer