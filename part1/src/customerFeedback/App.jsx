// A simple web application for collecting and displaying customer feedback.
import React, { useState } from 'react';
import Button from '../components/Buttons.jsx';

const App = () => {

    // Stateful Ratings
    const [ goodRating, setGoodRating ] = useState(0);
    const [ indiffRating, setIndiffRating ] = useState(0);
    const [ badRating, setBadRating ] = useState(0);

    // Called when rating buttons are clicked
    const handleClick = (ratingType) => {
        switch(ratingType) {
            case 'good':
                setGoodRating(goodRating + 1);
                break;
            case 'indiff':
                setIndiffRating(indiffRating + 1);
                break;
            case 'bad':
                setBadRating(badRating + 1);
                break;
            default:
                console.log('Feedback HandleClick Error');
        }
    }

    // Elements to render
    return (
        <div style={{padding: "2% 25%"}}>
            <hr />
            <h1>Customer Feedback</h1>
            <p>Please leave your feedback by clicking a button below</p>
            <Button handleClick={() => handleClick('good')} text={'Good'}/>
            <Button handleClick={() => handleClick('indiff')} text={'Indifferent'}/>
            <Button handleClick={() => handleClick('bad')} text={'Bad'}/>
            <h2>Statistics</h2>
            <p>Good: {goodRating}</p>
            <p>Indifferent: {indiffRating}</p>
            <p>Bad: {badRating}</p>
        </div>
    );
}

export default App
