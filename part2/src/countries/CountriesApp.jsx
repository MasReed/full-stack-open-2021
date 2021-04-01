// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import CountryInfo from './CountryInfo.jsx';

// Access environment variables (API keys)
// require('dotenv').config();

// Search for different countries to find out their details.
const App = () => {

    // Application States
    const [ countries, setCountries ] = useState([]);
    const [ searchString, setSearchString ] = useState('');
    const [ filteredCountries, setFilteredCountries ] = useState([]);


    // Fetch country data from API
    useEffect( () => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then( response => {
                setCountries(response.data);
            });
    }, []);

    // Fetch weather data from API
    useEffect( () => {
        const params = {
            query: 'Chicago',
            access_key: process.env.REACT_APP_WEATHER_API_KEY
        }
        axios
            .get('http://api.weatherstack.com/current', {params} )
            .then( response => {
                const apiResponse = response.data
                console.log(apiResponse);
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

    // Show details, coupled to button event.
    const [ details, setDetails ] = useState(null);
    const [ showDetails, setShowDetails ] = useState(false);

    const handleShowClick = (event) => {

        setShowDetails( () => !showDetails );

        const id = event.target.parentNode.id;
        const country = filterCountries(countries, id)[0]

        setDetails( (prevState) => <CountryInfo country={country} /> );
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


// {/* Show Information when filtered to 1 country */}
// { (filteredCountries.length === 1)
//   ? <DisplayCountry key={filteredCountries[0].name} country={filteredCountries[0]} />
//   : null
// }
//
// {/* Only show up to 10 results */}
// { (filteredCountries.length < 10)
//     ? filteredCountries.map( country => (
//         <div key={country.name} style={{display: 'block'}}>
//             <p style={{display: 'inline'}}>{country.name}</p>
//             <button onClick={handleShowClick}  style={{margin: '2px 5px'}}>Show</button>
//         </div>
//     ))
//     : <p>Please refine your search.</p>
// }
