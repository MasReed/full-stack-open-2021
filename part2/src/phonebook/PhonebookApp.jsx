// Modules
import React, { useState, useEffect } from 'react';
// Services
import contactsService from './services/contacts.js';
// Components
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

const App = () => {

    // Stateful list of all contacts
    const [ persons, setPersons ] = useState([]);

    // Stateful contact info
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    // Stateful display of contacts from search filter
    const [ searchStr, setSearchStr ] = useState('');
    const [ showAllContacts, setShowAllContacts ] = useState(true);

    // Fetch Data from json-server with useEffect hook
    useEffect( () => {
        contactsService
            .readAllContacts()
            .then( response => setPersons(response) )
    }, []);

    // Add contact name from input
    const addContact = (event) => {
        // Don't reload page on submit
        event.preventDefault();

        // Checks if entry already exists
        // if (persons.some( person => person.name.toLowerCase() === newName.toLowerCase() )) {
        //     alert(`${newName} is already entered.`);
        // } else {
        const contactObject = { name: newName, number: newNumber }

        // Server Communication
        contactsService
            .createContact(contactObject)
            .then( returnedContact => {
                setPersons(persons.concat(returnedContact))
            });

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
