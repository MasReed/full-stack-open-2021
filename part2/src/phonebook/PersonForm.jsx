import React from 'react';

const PersonForm = ({ onSubmit, newName, handleNameChange, newNumber, handleNumberChange }) => {
    // Add a new contact with name and number when submitted
    return (
        <>
            <h2>Add New Contact</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Name: </label>
                    <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    <label>Number: </label>
                    <input value={newNumber} onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </>
    );
}

export default PersonForm;
