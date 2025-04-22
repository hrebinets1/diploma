import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Skills = () => {

    useEffect(() => {
        document.title = "Skill choosing";
    }, [] );
    
    const navigate = useNavigate();

    const reading = "/reading";
    const listening = "/listening";

    return (
        <div className='main-text'>
            <h1>Оберіть, з чим бажаєте попрактикуватись</h1>
            <button onClick={() => navigate(reading)}>Reading</button>
            <button onClick={() => navigate(listening)}>Listening</button>
        </div>
    );
}

export default Skills;
