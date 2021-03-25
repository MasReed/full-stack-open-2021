import React from 'react';
import Part from './Part.jsx'

const Content = (props) => {

    const partItems = props.parts.map( (part, index) =>
        <Part key={index} name={part.name} n={part.exercises}/>
    );

    return partItems;
}

export default Content
