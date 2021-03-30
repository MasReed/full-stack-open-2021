import React from 'react';
// Components
import Part from './Part.jsx';

const Content = (props) => {

    const contentParts = props.content.map( (part) =>
        <Part key={part.id} partName={part.name} exercises={part.exercises}/>);

    return contentParts;
}

export default Content;
