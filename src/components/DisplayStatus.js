import React from 'react';

function DisplayStatus({ type, message }) {
    return (
        <div className={`display-status ${type}`}>
            {message}
        </div>
    );
}

export default DisplayStatus;