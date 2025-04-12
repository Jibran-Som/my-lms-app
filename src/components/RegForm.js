import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';




function RegForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    function validateForm() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirm-password").value;
        let email = document.getElementById("email").value;
        let errors = [];
        let messageBox = document.getElementById("messageBox");
        messageBox.style.display = "none";
        messageBox.innerHTML = "";
    
        if (username.length < 3 || username.length > 20) {
            errors.push("Invalid username (Username must be between 3 and 20 characters)");
        }
        else if (!isAlpha(username.charAt(0))) {
            errors.push("Invalid username (Username must start with a letter)");
        }
        else if (containsSpaceOrSpecialChars(username)) {
            errors.push("Invalid username (Only letters, numbers, hyphens, and underscores allowed)");
        }
    
        if (password.length < 8) {
            errors.push("Invalid password (Must be at least 8 characters)");
        }
        else if (!containsUppercase(password) || !containsLowercase(password) || !containsNumber(password) || !containsSpecialChar(password)) {
            errors.push("Invalid password (Must have uppercase, lowercase, number, special character)");
        }
        else if (password.includes(" ")) {
            errors.push("Invalid password (Cannot contain spaces)");
        }
    
        if (confirmPassword !== password) {
            errors.push("Password and confirm password do not match");
        }
    
        if (!isValidEmail(email)) {
            errors.push("Invalid email address");
        }
    
        if (errors.length > 0) {
            messageBox.style.display = "block";
            messageBox.innerHTML = errors.join("<br>");
            messageBox.style.borderColor = 'black';
            messageBox.style.lineHeight = "1.8";
            return false;
        } else {
            messageBox.style.display = "block";
            messageBox.style.borderColor = 'black';
            messageBox.style.lineHeight = "1.8";
            messageBox.innerHTML = "Signup successful! Redirecting to login...";
            setTimeout(() => {
            }, 2000);
            return true;
        }
    }

    function handleRegistration(e){
        e.preventDefault();
        let validx = validateForm();
        if(validx){
            fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({'username':username, 'password':password, 'email':email}),   
                })

        .then(navigate('/LoginForm'))
            
        
        }

    
    }




    return(
        <div className='signupForm'>
            <h2 className='signup-text'>Sign Up</h2>

            <form id="signup-form" onSubmit={handleRegistration}>
                <label for="username">Username:</label>
                <input type="text" id='username' name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="form-input"required/>
                <br></br>
                <label for="password">Password:</label>
                <input type="password" id='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" required/>
                <br></br>
                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password" name="confirm-password" className='form-input' required/>
                <br></br>
                <label for="email">Email:</label>
                <input type="text" id='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" required/>
                <br></br>
                <button class="signup" type="submit">Sign Up</button>
            </form> 
            <br></br>
            <br></br>
            <div id="messageBox" class="message-box" style={{ border: '1px solid white', padding: '10px', display: 'none' }}></div>
            <br></br>
            <br></br>
            <a href="login.html">Already have an account? Login here</a>
                
        </div>
    );
}


function isAlpha(char) {
    return (char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z');
}

function containsSpaceOrSpecialChars(str) {
    let allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    for (let i = 0; i < str.length; i++) {
        if (!allowedChars.includes(str.charAt(i))) {
            return true;
        }
    }
    return false;
}

function containsUppercase(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) >= 'A' && str.charAt(i) <= 'Z') {
            return true;
        }
    }
    return false;
}

function containsLowercase(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) >= 'a' && str.charAt(i) <= 'z') {
            return true;
        }
    }
    return false;
}

function containsNumber(str) {
    for (let i = 0; i < str.length; i++) {
        if (str.charAt(i) >= '0' && str.charAt(i) <= '9') {
            return true;
        }
    }
    return false;
}

function containsSpecialChar(str) {
    let specialChars = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";
    for (let i = 0; i < str.length; i++) {
        if (specialChars.includes(str.charAt(i))) {
            return true;
        }
    }
    return false;
}

function isValidEmail(email) {
    if (email.includes(" ") || !email.includes("@")) {
        return false;
    }
    let atIndex = email.indexOf("@");
    let dotIndex = email.indexOf(".", atIndex);
    return atIndex > 0 && dotIndex > atIndex + 1 && dotIndex < email.length - 1;
}



export default RegForm;