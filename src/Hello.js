import React, {useEffect} from 'react'
import reading from './images/reading.png'
import listening from './images/listening.png'
import { Link } from 'react-router-dom';
import './css/main-text.css'

const Hello = () => {
    useEffect(() => {
        document.title = "Головна сторінка";
    }, [] );

    return (
        <div>
            <div className='main-text'>
                <h2>Вітаємо Вас на вебзастосунку для вивчення англійської мови!
                <p>Почни свою подорож у світ англійської з нами.</p>
                <p>Вивчай нові слова, тренуй граматику, практикуй мову - просто та зручно.</p>
                <strong>Готовий? Навчаймося разом!</strong>   
                </h2>
            </div>
            <div>
                
            <div className='main-text-img'>   
                <h2>Reading</h2>
                <Link to='/reading'><img className="img" src={reading} alt="Reading" style={{height: "200px", width: "600px"}}/></Link>
                <h2>Listening</h2>
                <Link to='/listening'><img className="img" src={listening} alt="Reading" style={{height: "200px", width: "600px"}}/></Link>
            </div>
            </div>
        </div>
        
    );
}


export default Hello