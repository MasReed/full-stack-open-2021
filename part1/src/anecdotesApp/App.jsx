// A simple web application for randomly displaying software anecdotes.
import React, { useState } from 'react';

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ];

    // 0-filled array to initialize selected.votes
    let aV = []
    aV.length = anecdotes.length;
    aV.fill(0);

    // Stateful anecdote index and votes.
    // Note: Innacurate if anecdotes array changes order. Better w/ different data struct.
    // Practicing complex state updates
    const [selected, setSelected] = useState({
        index: 0,
        votes: aV
    });

    //
    const handleVoteClick = () => {
        setSelected( (prevState) => {
            // Array of all votes to be returned
            const votesCopy = [...prevState.votes]
            votesCopy[selected.index] += 1;

            return({
                ...prevState,
                votes: votesCopy
            });
        });
    }

    //
    const handleNewAnecdoteClick = () => {
        const rn = getRandomInt(0, anecdotes.length);
        const newAnecdote = {
            index: rn,
            votes: selected.votes
        }
        setSelected(newAnecdote);
    }

    //
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    // Elements to render
    return (
        <div style={{padding: "2% 25%"}}>
            <hr />
            <h1>Anecdotes App</h1>
            <p>{anecdotes[selected.index]}</p>
            <button
                onClick={handleVoteClick}
                text={'Vote'}
                style={{padding: "5px 20px"}}
            >
            Vote!
            </button>
            <button
                style={{padding: '5px 20px'}}
                onClick={handleNewAnecdoteClick}
            >
            New Anecdote
            </button>
            <h3 style={{display: 'inline', padding: "5px 20px"}}>{selected.votes[selected.index]} Votes</h3>
        </div>
    );
}

export default App;
