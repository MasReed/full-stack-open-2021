// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import CountryInfo from './CountryInfo.jsx';

// Search for different countries to find out their details.
const App = () => {

    // Application States
    const [ countries, setCountries ] = useState([]);
    const [ searchString, setSearchString ] = useState('');
    const [ filteredCountries, setFilteredCountries ] = useState([]);
    const [ details, setDetails ] = useState(null);
    const [ showDetails, setShowDetails ] = useState(false);

    // Fetch country data from API
    useEffect( () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response => {
                setCountries(response.data);
            });
    }, []);


    // Filtering function
    const filterCountries = (countries, filter) => {
        return countries.filter( country =>
            country.name.toLowerCase()
                .includes(filter.toLowerCase()) === true );
    }

    // Filter countries by search input
    const handleSearchChange = (event) => {
        setSearchString(event.target.value);
        setFilteredCountries( filterCountries(countries, event.target.value) );
    }

    // Show country details on button click event.
    const handleShowClick = (event) => {
        const id = event.target.parentNode.id;
        const country = filterCountries(countries, id)[0]
        
        setShowDetails( () => !showDetails );
        setDetails( <CountryInfo country={country} /> );
    }

    // Determine what elements to display
    const handleDisplay = (countries) => {
        if ((countries.length === 1) && (!showDetails)) {
            return (<CountryInfo key={countries[0].name} country={countries[0]} />);

        } else if (countries.length < 10) {
            return (countries.map( country => (
                <div key={country.name} id={country.name} style={{display: 'block'}}>
                    <p style={{display: 'inline'}}>{country.name}</p>
                    <button onClick={handleShowClick} style={{margin: '2px 5px'}}>Show</button>
                </div>))
            );

        } else {
            if (searchString === '') {
                return null
            } else {
                return (<p>Please refine your search.</p>);
            }
        }
    }

    // Elements to render
    return (
        <div>
            <h1>Countries</h1>
            <div style={{paddingBottom: '15px'}}>
                <label>Find Countries: </label>
                <input type='search' value={searchString} onChange={handleSearchChange} />
            </div>

            {handleDisplay(filteredCountries)}
            {showDetails && details}
        </div>
    );
}

export default App;
