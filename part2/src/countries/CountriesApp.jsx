// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Components
import DisplayCountry from './DisplayCountry.jsx';

const App = () => {
    // Search for different countries to find out their details.

    // List of countries
    const [ countries, setCountries ] = useState([]);

    // Fetch country data from API
    useEffect( () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response => {
                setCountries(response.data);
            });
    }, []);


    // Search string, handler, and filter
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
            <h1>Countries</h1>
            <label>Find Countries: </label>
            <input type='search' value={searchString} onChange={handleSearchChange}/>
            {/* Only show up to 10 results */}
            { (filteredCountries.length >= 10)
                ? <p>Please refine your search.</p>
                : filteredCountries.map( country => <p key={country.name}>{country.name}</p>)
            }
            {/* Show Information when filtered to 1 country */}
            { (filteredCountries.length === 1)
                ? filteredCountries.map( country => <DisplayCountry key={country.name} country={country} /> )
                : null
            }
        </div>
    );
}

export default App;
