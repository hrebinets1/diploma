import React, { useEffect } from 'react';
//import { Link } from 'react-router-dom';


const Profile = () => {

    useEffect(() => {
        document.title = "Сторінка профілю";
    }, [] );


    return (
        <div>
            <h2 style={{textAlign: "center"}}>Головна сторінка профілю</h2>
        </div>
    );
}

export default Profile;
