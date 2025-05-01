import React, {useEffect} from 'react'
import reading from './images/reading.png'
import listening from './images/listening.png'
import grammar from './images/grammar.png'
import { Link } from 'react-router-dom';
import './css/main-text.css'
import vocabulary from './images/vocabulary.png'
import times from './images/learning_times.png'

const Hello = () => {
    useEffect(() => {
        document.title = "Головна сторінка";
    }, [] );

    return (
        <div className="height-width">
            <div className='main-text'>
                <h2>Вітаємо Вас на вебзастосунку для вивчення англійської мови!
                <p>Почни свою подорож у світ англійської з нами.</p>
                <p>Вивчай нові слова, тренуй граматику, практикуй мову - просто та зручно.</p>
                <strong>Готовий? Навчаймося разом!</strong>   
                </h2>
            </div>
                
            <div className='main-text-img'>  
                <h2>Для початку Ви можете обрати один з розділів, для цього необхідно натиснути на фотографію.</h2> 
                <h2>Читання</h2>
                <Link to='/reading'><img className="img" src={reading} alt="Reading"/></Link>
                <h2>Аудіювання</h2>
                <Link to='/listening'><img className="img" src={listening} alt="Listening"/></Link>
                <h2>Граматика</h2>
                <Link to='/grammar'><img className="img" src={grammar} alt="Grammar"/></Link>
                <h2>Словник</h2>
                <Link to='/vocabulary'><img className="img" src={vocabulary} alt="vocabulary"/></Link>
                <h2>Часи</h2>
                <Link to='/times'><img className="img" src={times} alt="Times"/></Link>
                </div>
        </div>
        
    );
}


export default Hello