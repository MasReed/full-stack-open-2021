import React from 'react';

const Total = (props) => {
    // Reducer function
    const sum = (acc, cV) => acc + cV;

    // Grab exercises attribute from each part into new array then sum all
    const eSum = props.parts.map( part => part.exercises).reduce(sum);

    return (
        <div>
            <p>Number of exercises {eSum}</p>
        </div>
    );
}

export default Total
