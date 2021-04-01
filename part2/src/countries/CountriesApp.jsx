import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

    // List of countries
    const [ countries, setCountries ] = useState([]);

    // Fetch country data
    useEffect( () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response => {
                setCountries(response.data);
            });
    }, []);


    // Search string and handler
    const [ searchString, setSearchString ] = useState('');

    const [ filteredCountries, setFilteredCountries ] = useState([]);

    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
        setFilteredCountries( () => (countries.filter( country =>
            country.name.toLowerCase()
                .includes(event.target.value.toLowerCase()) === true))
        );
    }

    // Elements to render
    return (
        <div>
            <label>Find Countries: </label>
            <input type='search' value={searchString} onChange={handleSearchChange}/>
            { (filteredCountries.length >= 10)
              ? <p>Please refine your search.</p>
              : filteredCountries.map( country => <p key={country.name}>{country.name}</p>)
            }
        </div>
    );
}

export default App;
