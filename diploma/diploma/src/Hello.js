import React, {useEffect} from 'react'
import reading from './images/reading.png'
import listening from './images/listening.png'
import grammar from './images/grammar.png'
import { Link } from 'react-router-dom';
import './css/main-text.css'
import vocabulary from './images/vocabulary.png'

const Hello = () => {
    useEffect(() => {
        document.title = "Головна сторінка";
    }, [] );

    return (
        <div className="max-height">
            <div className='main-text'>
                <h2>Вітаємо Вас на вебзастосунку для вивчення англійської мови!
                <p>Почни свою подорож у світ англійської з нами.</p>
                <p>Вивчай нові слова, тренуй граматику, практикуй мову - просто та зручно.</p>
                <strong>Готовий? Навчаймося разом!</strong>   
                </h2>
            </div>
                
            <div className='main-text-img'>   
                <h2>Читання</h2>
                <Link to='/reading'><img className="img" src={reading} alt="Reading" style={{height: "200px", width: "600px"}}/></Link>
                <h2>Аудіювання</h2>
                <Link to='/listening'><img className="img" src={listening} alt="Listening" style={{height: "200px", width: "600px"}}/></Link>
                <h2>Граматика</h2>
                <Link to='/grammar'><img className="img" src={grammar} alt="Grammar" style={{height: "200px", width: "600px"}}/></Link>
                <h2>Словник</h2>
                <Link to='/vocabulary'><img className="img" src={vocabulary} alt="vocabulary" style={{height: "200px", width: "600px"}}/></Link>
            </div>
        </div>
        
    );
}


export default Hello