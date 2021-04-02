// Modules
import React, { useState, useEffect } from 'react';
// Services
import contactsService from './services/contacts.js';
// Components
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';

const App = () => {

    // All contacts
    const [ persons, setPersons ] = useState([]);

    // New contact info
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    // Display of contacts from search filter
    const [ searchStr, setSearchStr ] = useState('');
    const [ showAllContacts, setShowAllContacts ] = useState(true);

    // Fetch Data from json-server
    useEffect( () => {
        contactsService
            .readAllContacts()
            .then( response => setPersons(response) )
    }, []);


    // Add contact info from input
    const addContact = (event) => {
        // Don't reload page on submit
        event.preventDefault();

        // Checks if entry already exists
        // if (persons.some( person => person.name.toLowerCase() === newName.toLowerCase() )) {
        //     alert(`${newName} is already entered.`);
        // } else {
        const contactObject = {
            name: newName,
            number: newNumber
        }

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


    const deleteContact = (event) => {
        const eventId = parseInt(event.target.parentNode.id);
        const contact = persons.find( person => person.id === eventId );
        const isConfirmed = window.confirm(`Delete contact '${contact.name}' ?`);

        if (isConfirmed) {
            contactsService
                .deleteContact(eventId)
                .then( returnedData => {
                    console.log(persons);
                    setPersons(persons.map( person => person.id !== eventId ? person : null))
                })
                .catch( error => {
                    console.log(error)
                    setPersons(persons.filter( person => person.id !== eventId ))
                });
        }
    }

    // const toggleImportanceOf = (id) => {
    //     const note = notes.find( n => n.id === id )
    //     const changedNote = { ...note, important: !note.important }
    //
    //     noteService
    //         .update(id, changedNote)
    //         .then( returnedNote => {
    //             setNotes(notes.map( note => note.id !== id ? note : returnedNote))
    //         })
    //         .catch( error => {
    //             alert(`The note '${note.content}' does not exist.`)
    //             setNotes(notes.filter( n => n.id !== id ))
    //         });
    // }

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

            <Persons
                contacts={contactsToShow}
                onClick={deleteContact}
            />
        </>
    );
}

export default App;
