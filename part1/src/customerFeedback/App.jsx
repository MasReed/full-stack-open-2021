// A simple web application for collecting and displaying customer feedback.
import React, { useState } from 'react';
import Button from '../components/Buttons.jsx';

const App = () => {

    const [ goodRating, setGoodRating ] = useState(0);
    const [ indiffRating, setIndiffRating ] = useState(0);
    const [ badRating, setBadRating ] = useState(0);

    const goodClick = () => {
        setGoodRating(goodRating + 1);
    }

    const indiffClick = () => {
        setIndiffRating(indiffRating + 1);
    }

    const badClick = () => {
        setBadRating(badRating + 1);
    }

    // Elements to render
    return (
        <div style={{padding: "2% 25%"}}>
            <hr />
            <h1>CUSTOMER FEEDBACK</h1>
            <p>Please leave your feedback by clicking a button below</p>
            <Button handleClick={goodClick} text={'Good'}/>
            <Button handleClick={indiffClick} text={'Indifferent'}/>
            <Button handleClick={badClick} text={'Bad'}/>
            <h2>Statistics</h2>
            <p>Good: {goodRating}</p>
            <p>Indifferent: {indiffRating}</p>
            <p>Bad: {badRating}</p>
        </div>
    );
}

export default App
