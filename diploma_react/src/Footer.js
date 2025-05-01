import React from 'react'
import './css/footer.css'
import logo from './images/logo.png'
import { Link } from 'react-router-dom';
import nuzp from './images/nuzp.png'

const Footer = () => {

    return (
        <footer className="footer">
            <div className='footer-column'>
                <div className="footer-logo-web">
                    <img className="img" src={logo} alt="Лого" style={{ height: '20px' }} />
                    <Link to='/' style={{ color: 'black'}}>Веб-застосунок</Link>
                </div>
            </div>

            <div className='footer-column'>    
                <h4>Skills</h4>
                <Link to='/reading'>Reading</Link>
                <Link to='/listening'>Listening</Link>
                <Link to='/grammar'>Grammar</Link>
                <Link to='/vocabulary'>Vocabulary</Link>
                <Link to='/times'>Times</Link>
            </div>

            <div className='footer-column'>    
                <h4>Ми у соц. мережах</h4>
                <a href='https://facebook.com' target="_blank" rel="noreferrer">Facebook</a>
                <a href='https://instagram.com' target="_blank" rel="noreferrer">Instagram</a>
                <a href="https://zp.edu.ua/" target="_blank" rel="noreferrer">Університет</a>
            </div>

            <div className='footer-column'>    
                <img className="img" src={nuzp} alt="НУЗП" style={{ height: '256px', width: '256px' }} />
            </div>


            <div className="footer-copyright">
                © 2025 Веб-застосунок для дипломної роботи.
            </div>
        </footer>
    );
}

export default Footer;
