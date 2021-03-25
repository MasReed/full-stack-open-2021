import React from 'react';
import ReactDOM from 'react-dom';


const Content = (props) => {
    return (
        <div>
            <p>{props.part} {props.n}</p>
        </div>
    );
}

export default Content
