import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    async function handleAuthentication(event) {
        event.preventDefault();
        const data = await retrieveData();
        var usernameInput = username;
        var passwordInput = password;

        var found = false;

        for(let i = 0; i<data.length;i++){
            if(data[i].username == usernameInput && data[i].email == passwordInput){
                found = true;
                alert('fo')
                navigate('/CoursesPage');
                break;
            }
        }
        if (!found) {
            alert("nf")
        }

        
        
    }

    async function retrieveData() {
        try{
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data;
        }

        catch(error){
            console.error("Error fetching data:", error);
        } 
    }





    return (
        <div>
            <form id='login' onSubmit={handleAuthentication}>
                <h1>Login</h1>
                <h3>
                    Username:
                </h3>
                <input type="text" id='username' onChange={(e) => setUsername(e.target.value)} required/>
                <h3>
                    Password:
                </h3>
                <input type="password" id='password' onChange={(e) => setPassword(e.target.value)} required/>
                <button id = 'login_button' type="submit">Login</button>
                <br />
            </form>
        </div>
        );
    };

export default LoginForm;
