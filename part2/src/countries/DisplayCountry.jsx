import React from 'react';

const DisplayCountry = ({ country }) => {
    // Display country information
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

export default DisplayCountry;
