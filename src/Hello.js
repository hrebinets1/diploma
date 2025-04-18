import React, {useEffect} from 'react'
import './css/main.css'

function Hello(){
    useEffect(() => {
        document.title = "Головна сторінка";
    }, [] );

    return (
        <div className='main-text'>
            <h2>Вітаємо Вас на вебзастосунку для вивчення англійської мови!
             <p>Почни свою подорож у світ англійської з нами.</p>
             <p>Вивчай нові слова, тренуй граматику, практикуй мову - просто та зручно.</p>
             <strong>Готовий? Навчаймося разом!</strong>   
            </h2>
        </div>
    );
}


export default Hello