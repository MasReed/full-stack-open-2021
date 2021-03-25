import React from 'react';
import ReactDOM from 'react-dom';
import Part from './Part.jsx'

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0]} n={props.n[0]}/>
            <Part part={props.parts[1]} n={props.n[1]}/>
            <Part part={props.parts[2]} n={props.n[2]}/>
        </>
    );
}

export default Content
