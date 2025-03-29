import React from 'react';
import logo from '../images/logo.jpg';
import '../index.css';
function Header(){

    return(
    <div>
        <div class='header'>
            <img src={logo} alt="LMS Logo" style={{width: '100px', height: '100px'}} />
            <h1>LMS - Learning Management System</h1>
        </div>
        <div class='nav'>
            <a href="login.html">Login</a> 
            <a href="leaderboard.html">Leaderboard</a> 
            <a href="#about">About LMS</a>
        </div>
    </div>
    
    );
};

export default Header;