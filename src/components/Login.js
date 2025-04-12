import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthMessage from './AuthMessage';
import './Login.css'

// Create Auth Context
export const AuthContext = createContext();

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [authenticated, setAuthenticated] = useState(false);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch user data on component mount
    function handleAuthentication(e) {
        // alert("fetch")
        e.preventDefault(); // Prevent default form submission

        fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({'username':username, 'password':password}),   
            })

        

        .then(async (response) => {

            const data = await response.json();

            if (data.success) {
                setAuthenticated(true);
                setMessage({ type: 'success', text: data.message });
                localStorage.setItem('userId', data.userId);
                navigate('/CoursesPage');
            } else {
                setMessage({ type: 'error', text: 'Authentication failed. Incorrect username or password.' });
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        });
    
    };

    
    return (
        <AuthContext.Provider value={{ username, authenticated }}>
            <div className="login-container">
                <div className="">
                <h1>Login</h1>
                    <form id='login' onSubmit={handleAuthentication}>
                        <div className="form-group">
                            <label htmlFor='username'>Username:</label>
                            <input 
                                type="text" 
                                id='username' 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className=""
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor='password'>Password:</label>
                            <input 
                                type="password" 
                                id='password' 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                className=""
                                required
                            />
                        </div>
                        <button id='login_button' type="submit" className="">Login</button>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                        <Link className="forgot-password" to="/SignupPage">Don't have an account? Sign up!</Link>
                    </form>
                    {message.text && <DisplayStatus type={message.type} message={message.text} />}
                </div>
                <AuthMessage />
            </div>
        </AuthContext.Provider>
    );
}

// DisplayStatus Component
function DisplayStatus({ type, message }) {
    return (
        <div className={`status-message ${type}`}>
            {message}
        </div>
    );
}

export default LoginForm;