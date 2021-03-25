import React from 'react';

const Hello = (props) => {
    const { name, age } = props.info;
    const bornYear = () => new Date().getFullYear() - age

    return (
        <div>
            <p>Hello {name}, you are {age} years old.</p>
            <p>So you were probably born in {bornYear()}</p>
        </div>
    )
}

export default Hello
