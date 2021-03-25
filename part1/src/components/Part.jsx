import React from 'react';
import ReactDOM from 'react-dom';

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.n}</p>
        </div>
    );
}

export default Part
