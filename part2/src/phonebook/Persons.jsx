import React from 'react';
import Person from './Person.jsx';

const Persons = ({ contacts, onClick }) => {
    // Display contact name and number from list of contacts
    return (
        <>
            <h2>Contacts</h2>
            { contacts.map( person => person
                ? <Person
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    number={person.number}
                    onClick={onClick}
                  />
                : null)
            }
        </>
    );
}

export default Persons;
