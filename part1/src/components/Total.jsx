import React from 'react';
import ReactDOM from 'react-dom';



const Total = (props) => {
    const sum = (acc, cV) => acc + cV;
    
    return (
        <div>
            <p>Number of exercises {props.exercises.reduce(sum)}</p>
        </div>
    );
}

export default Total
