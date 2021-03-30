import React from 'react';

const Part = ({ partName, exercises }) => {

    return (
        <>
            <h3>{partName}</h3>
            <p>Number of Exercises: {exercises}</p>
        </>
    );
}

export default Part;
