import React from 'react';

const Persons = ({ contacts }) => {
    // Display contact name and number from list of contacts
    return (
        <>
            <h2>Contacts</h2>
            { contacts.map( person => <p key={person.name}>{person.name}: #{person.number}</p>) }
        </>
    );
}

export default Persons;
