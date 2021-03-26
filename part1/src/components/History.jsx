import React from 'react';

const History = (props) => {

    console.log(props.allClicks);

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
