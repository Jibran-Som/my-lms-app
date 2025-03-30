import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage({ type: 'error', text: 'Failed to fetch user data' });
            }
        }
        fetchUsers();
    }, []);

    // Handle redirect after successful login
    useEffect(() => {
        if (authenticated) {
            const timer = setTimeout(() => {
                navigate('/CoursesPage');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [authenticated, navigate]);

    async function handleAuthentication(event) {
        event.preventDefault();
        
        // Input validation
        if (!username || !password) {
            setMessage({ type: 'error', text: 'Username and password cannot be empty' });
            return;
        }
        
        if (password.length < 8) {
            setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
            return;
        }

        const userFound = users.some(user => 
            (user.username === username || user.email === username) && 
            user.email === password // Using email as password
        );

        if (userFound) {
            setAuthenticated(true);
            setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
        } else {
            setMessage({ type: 'error', text: 'Invalid username or password' });
        }
    }

    return (
        <AuthContext.Provider value={{ username, authenticated }}>
            <div className="login-page">
                <div className="login-container">
                    <form id='login' onSubmit={handleAuthentication}>
                        <h1>Login</h1>
                        <div className="form-group">
                            <label htmlFor='username'>Username:</label>
                            <input 
                                type="text" 
                                id='username' 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} 
                                className="form-input"
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
                                className="form-input"
                                required
                            />
                        </div>
                        <button id='login_button' type="submit" className="primary-button">Login</button>
                        <a href="#" className="forgot-password">Forgot Password?</a>
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