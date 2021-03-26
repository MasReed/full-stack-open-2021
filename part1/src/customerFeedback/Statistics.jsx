import React from 'react';

const Statistics = ( {good, neut, bad} ) => {

    const tot = good + neut + bad;
    let avgScore = null;
    let posScore = null;

    if (tot !== 0) {
        avgScore = (((good/tot) - (bad/tot)) * 100).toFixed(0);
        posScore = ((good / tot) * 100).toFixed(0);
    } else {
        avgScore = 0;
        posScore = 0;
    }

    return (
        <>
            <h2>Statistics</h2>
            <p>Good: {good}</p>
            <p>Neutral: {neut}</p>
            <p>Bad: {bad}</p>
            <hr />
            <p>Total: {tot}</p>
            <p>Average: {avgScore} %</p>
            <p>Positive: {posScore} %</p>
        </>
    );
}

export default Statistics;
