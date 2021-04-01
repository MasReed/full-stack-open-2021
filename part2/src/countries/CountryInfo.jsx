import React from 'react';
import Weather from './Weather.jsx';

const CountryInfo = ({ country }) => {
    // Display country information
    return (
        <div>
            <h1>{country.name}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages:</h3>
            { country.languages.map( lang => <p key={lang.iso639_1}>{lang.name}</p>)}
            <h3>Flag:</h3>
            <img src={country.flag} alt={`Flag of ${country.name}`} style={{maxWidth: '300px', border: '2px solid #555'}}/>
            <Weather city={country.capital} />
        </div>
    );
}

export default CountryInfo;
