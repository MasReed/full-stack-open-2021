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
            { (filteredCountries.length === 1)
                ? filteredCountries.map( country => <DisplayCountry key={country.name} country={country} /> )
                : null
            }
        </div>
    );
}

export default App;

const DisplayCountry = ({ country }) => {

    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            { country.languages.map( lang => <p key={lang.iso639_1}>{lang.name}</p>)}
            <h3>Flag:</h3>
            <img src={country.flag} alt='Country flag' style={{maxWidth: '300px', border: '2px solid #555'}}/>
        </div>
    );
}
