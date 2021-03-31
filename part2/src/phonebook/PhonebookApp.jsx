import React, { useState } from 'react';
// Components
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

const App = () => {

    // Stateful list of all contacts (temporary hardcoded data)
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

    // Stateful display of contacts from search filter
    const [ searchStr, setSearchStr ] = useState('');
    const [ showAllContacts, setShowAllContacts ] = useState(true);

    // Add contact name from input
    const addContact = (event) => {
        // Don't reload page on submit
        event.preventDefault();

        // Checks if entry already exists
        if (persons.some( person => person.name.toLowerCase() === newName.toLowerCase() )) {
            alert(`${newName} is already entered.`);
        } else {
            const contactObject = { name: newName, number: newNumber }
            setPersons(persons.concat(contactObject));
        }
        // Reset input fields
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
        : persons.filter( person =>
            person.name.toLowerCase().includes(
                searchStr.toLowerCase()
            ) === true
        )

    // Elements to render
    return (
        <>
            <h1>Phonebook</h1>

            <Filter
                onChange={handleSearchChange}
                value={searchStr}
            />

            <PersonForm
                onSubmit={addContact}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <Persons contacts={contactsToShow} />
        </>
    );
}

export default App;
