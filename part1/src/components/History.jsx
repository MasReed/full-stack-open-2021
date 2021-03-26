import React from 'react';

const History = (props) => {

    if (props.allClicks.length === 0) {
        return (
            <div>
                <p>Press the buttons!</p>
            </div>
        );
    }

    return (
        <div>
            <p>Button history: {props.allClicks.join(' ')}</p>
        </div>
    );
}

export default History
