import React from 'react';

const SuccessBanner = ({ message }) => {

    if (!message) {
        return null
    }

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
        <div style={successStyle}>
            {message}
        </div>
    );
}

export default SuccessBanner;
