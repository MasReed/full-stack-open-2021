import React, { useState, useEffect } from 'react';
import contactsService from './services/contacts.js';
import ErrorBanner from './ErrorBanner.jsx';
import Filter from './Filter.jsx';
import PersonForm from './PersonForm.jsx';
import Persons from './Persons.jsx';
import SuccessBanner from './SuccessBanner.jsx';

const App = () => {

    // All contacts
    const [ persons, setPersons ] = useState([]);

    // New contact info
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');

    // Display of contacts from search filter
    const [ searchStr, setSearchStr ] = useState('');
    const [ showAllContacts, setShowAllContacts ] = useState(true);

    // Messages
    const [ successMsg, setSuccessMsg ] = useState(null);
    const [ errorMsg, setErrorMsg ] = useState(null);


    // Fetch Data from json-server
    useEffect( () => {
        contactsService
            .readAllContacts()
            .then( response => setPersons(response))
        }, []);


    // Add contact info from input
    const addContact = (event) => {
        // Don't reload page on submit
        event.preventDefault();

        const contactObject = {
            name: newName,
            number: newNumber
        }

        // Checks if entry already exists
        if (persons.some( person => person.name.toLowerCase() === newName.toLowerCase() )) {
            const affirm = window.confirm(
                `\n'${newName}' is already a contact.
                \nReplace the previous number with: ${newNumber}?`
            )
            // Update contact number
            if (affirm) {
                updateContact(contactObject);
            }
        } else {
            // Server Communication
            contactsService
                .createContact(contactObject)
                .then( returnedContact => {
                    setPersons(persons.concat(returnedContact))
                    // toast success banner
                    setSuccessMsg(
                        `'${contactObject.name}' successfully added!`
                    );
                    setTimeout( () => {
                        setSuccessMsg(null)
                    }, 5000)
                });


        }

        // Reset input fields
        setNewName('');
        setNewNumber('');
    }


    // Update contact number
    const updateContact = ({ name, number }) => {

        const match = persons.filter( person => person.name === name)[0]
        const id = match.id;
        const updatedContact = {
            name: name,
            number: number,
            id: id
        }

        // Update on server
        contactsService
            .updateContact(updatedContact)
            .then( response => {
                setPersons( prevState => {
                    const prevIndex = prevState.indexOf(match);
                    let updatedPersons = [...prevState];
                    updatedPersons[prevIndex] = response;

                    return updatedPersons
                })

                // Toast success banner
                setSuccessMsg(
                    `'${name}' successfully updated!`
                );
                setTimeout( () => {
                    setSuccessMsg(null)
                }, 5000)
            })
            .catch( error => {
                setErrorMsg(
                    `'${updatedContact.name}' cannot be found.`
                )
                setTimeout( () => {
                    setErrorMsg(null)
                }, 5000)
            });

        // Reset input fields
        setNewName('');
        setNewNumber('');
    }


    // Delete Contact from list
    const deleteContact = (event) => {
        const eventId = event.target.parentNode.id;
        const contact = persons.find( person => person.id === eventId );
        const isConfirmed = window.confirm(`Delete contact '${contact.name}' ?`);

        if (isConfirmed) {
            contactsService
                .deleteContact(eventId)
                .then( returnedData => {
                    setPersons(persons.filter( person => person.id !== eventId ))
                })
                .catch( error => {
                    console.log(error)
                });
        }
    }


    // Filter list of contacts to show
    const contactsToDisplay = () => {

        const contactsSet = showAllContacts
            ? persons
            : persons.filter( person =>
                person.name.toLowerCase().includes(
                    searchStr.toLowerCase()
                ) === true
              )
        return contactsSet;
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


    // Elements to render
    return (
        <>
            <h1>Phonebook</h1>

            <SuccessBanner message={successMsg} />
            <ErrorBanner message={errorMsg} />

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
                getContacts={contactsToDisplay}
                onClick={deleteContact}
            />
        </>
    );
}

export default App;
