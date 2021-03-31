import React, { useState } from 'react';
// Components
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

const App = () => {

    // Stateful list of all contacts
    const [ persons, setPersons ] = useState([
        {
            name: 'Arto Hellas',
            number: '867-5309'
        },
        {
            name: 'Test Person',
            number: 'TestNumber'
        },
        {
            name: 'Cora theCat',
            number: 'meow purr'
        },
        {
            name: 'The Quick Brown Fox Jumps Over The Lazy Dog',
            number: '123-456-7890'
        }
    ]);

    // Stateful contact info
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    // Stateful display of contacts used with search filter
    const [ searchStr, setSearchStr ] = useState('');
    const [ showAllContacts, setShowAllContacts ] = useState(true);

    // Add contact name from input
    const addContact = (event) => {
        event.preventDefault();

        // Checks if entry alread exists
        if (persons.some( person => person.name.toLowerCase() === newName.toLowerCase() )) {
            alert(`${newName} is already entered.`);
        } else {
            const contactObject = { name: newName, number: newNumber }
            setPersons(persons.concat(contactObject));
        }
        setNewName('');
        setNewNumber('');
    }

    // When Name input is changed
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    // When Number input is changed
    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    // When Search input is changed
    const handleSearchChange = (event) => {
        setShowAllContacts(false);
        setSearchStr(event.target.value);
    }

    // Filter list of contacts to show if search input is changed
    const contactsToShow = showAllContacts
        ? persons
        : persons.filter( person => person.name.toLowerCase().includes(searchStr.toLowerCase()) === true )

    // Elements to render
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                <input
                    placeholder='Search Contacts...'
                    onChange={handleSearchChange}
                    value={searchStr}
                />
            </div>

            <PersonForm
                onSubmit={addContact}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h2>Add New Contact</h2>
            <form onSubmit={addContact}>
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

            <Persons contacts={contactsToShow} />
        </div>
    );
}

export default App;
