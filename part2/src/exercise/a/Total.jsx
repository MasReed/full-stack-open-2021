import React from 'react';

const Total = ({ content }) => {
    // Get number of exercises from each content part and sum
    const parts = content.map( part => part.exercises);
    const total = parts.reduce( (a, b) => a + b, 0 );

    return <h3>A total of {total} exercises.</h3>;
}

export default Total;
