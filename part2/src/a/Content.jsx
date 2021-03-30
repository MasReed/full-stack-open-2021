import React from 'react';
// Components
import Part from './Part.jsx';

const Content = ({ content }) => {
    // Display parts of the content from a course object
    const contentParts = content.map( (part) =>
        <Part key={part.id} partName={part.name} exercises={part.exercises}/>);

    return contentParts;
}

export default Content;
