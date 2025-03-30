import React, { useContext } from 'react';
import { AuthContext } from './Login';
import DisplayStatus from './DisplayStatus';

function AuthMessage() {
    const { username, authenticated } = useContext(AuthContext);
    
    return (
        <div className="auth-message">
            {authenticated && (
                <DisplayStatus 
                    type="success" 
                />
            )}
        </div>
    );
}

export default AuthMessage;