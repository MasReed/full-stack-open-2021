// A simple web application for collecting and displaying customer feedback.
import React, { useState } from 'react';
import Button from '../components/Buttons.jsx';
import Statistics from './Statistics.jsx';


const App = () => {

    // Stateful Ratings and Stats
    const [ goodRating, setGoodRating ] = useState(0);
    const [ neutRating, setNeutRating ] = useState(0);
    const [ badRating, setBadRating ] = useState(0);
    const [ hasFeedback, setHasFeedback ] = useState(false);

    // Called when rating buttons are clicked
    const handleClick = (ratingType) => {

        setHasFeedback(true);

        switch(ratingType) {
            case 'good':
                setGoodRating(goodRating + 1);
                break;
            case 'neut':
                setNeutRating(neutRating + 1);
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
            <Button handleClick={() => handleClick('neut')} text={'Neutral'}/>
            <Button handleClick={() => handleClick('bad')} text={'Bad'}/>
            {hasFeedback ?
                <Statistics
                    good={goodRating}
                    neut={neutRating}
                    bad={badRating}
                />
                : <p>Be the first to leave feedback!</p>
            }
            <hr />
        </div>
    );
}

export default App
