import React, {useEffect} from 'react'



function Vocabulary(){

    useEffect(() => {
        document.title = "Vocabulary page";
      }, [] );
    return (
        <div className='main-text'>
            <h1>Vocabulary page!</h1>

        </div>
    );
}

export default Vocabulary;