import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import reading from '../images/reading.png';
import listening from '../images/listening.png';


const Skills = () => {

    useEffect(() => {
        document.title = "Skill choosing";
    }, [] );


    return (
        <div className='grammar'>
            <h2>Оберіть, з чим бажаєте попрактикуватись</h2>
            <h2>Читання</h2>
            <Link to='/reading'><img className="img" src={reading} alt="Reading" style={{height: "200px", width: "600px"}}/></Link>
            <h2>Аудіювання</h2>
            <Link to='/listening'><img className="img" src={listening} alt="Listening" style={{height: "200px", width: "600px"}}/></Link>
            
        </div>
    );
}

export default Skills;
