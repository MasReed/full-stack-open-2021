import React, { useState } from 'react';

const App = () => {

    // Stateful list of all contacts
    const [ persons, setPersons ] = useState([
        {name: 'Arto Hellas'},
        {name: 'Test Person'},
        {name: 'Cora theCat'}
    ]);

    // Stateful name of new contact
    const [newName, setNewName ] = useState('');


    // Add contact name from input
    const addContact = (event) => {
        event.preventDefault();

        const contactObject = { name: newName }
        setPersons(persons.concat(contactObject));
        setNewName('');
    }

    //
    const handleContactChange = (event) => {
        setNewName(event.target.value);
    }

    // Elements to render
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addContact}>
                <div>
                    Name: <input value={newName} onChange={handleContactChange}/>
                    debug: {newName}
                </div>
                <div>
                    <button type='submit'>Add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            { persons.map( person => <p key={person.name}>{person.name}</p>) }
        </div>
    );
}

export default App;
