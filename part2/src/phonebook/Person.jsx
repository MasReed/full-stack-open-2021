import React from 'react';

const Person = ({ id, name, number, onClick }) => {
    return (
        <div key={id} id={id} style={{padding: '5px'}}>
            <p style={{display: 'inline'}}>{name}: #{number}</p>
            <button onClick={onClick} style={{display: 'inline', marginLeft: '10px'}}>Delete</button>
        </div>
    );
}

export default Person;
