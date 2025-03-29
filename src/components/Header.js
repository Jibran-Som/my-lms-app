import React from 'react';
import logo from '../images/logo.jpg';
import '../index.css';
import { Link } from 'react-router-dom';
function Header(){
    return(
    <div>
        <div class='header'>
            <img src={logo} alt="LMS Logo" style={{width: '100px', height: '100px'}} />
            <h1>LMS - Learning Management System</h1>
        </div>
        <div class='nav'>
            <Link to="/">Home</Link>  
            <Link to="/CoursesPage">Courses</Link> 
            <Link to="#about">Login</Link>
        </div>
    </div>
    
    );
};

export default Header;