import React from 'react';
import CountryInfo from './CountryInfo.jsx';

const DisplayCountries = (countries, handleShowClick) => {

    console.log(countries);

    if (countries.length === 1) {
        return (<CountryInfo key={countries[0].name} country={countries[0]} />);
    } else if (countries.length < 10) {
        return (countries.map( country => (
            <div key={country.name} style={{display: 'block'}}>
                <p style={{display: 'inline'}}>{country.name}</p>
                <button onClick={handleShowClick}  style={{margin: '2px 5px'}}>Show</button>
            </div>))
        );
    } else {
        return (<p>Please refine your search.</p>);
    }
}

export default DisplayCountries
