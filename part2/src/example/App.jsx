import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Note from './Note.jsx';

// Main App
const App = () => {

    // Stateful Data
    const [ notes, setNotes ] = useState([]);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);


    // Fetch Data from json-server
    useEffect( () => {
        axios
            .get('http://localhost:3001/notes')
            .then( response => {
                setNotes(response.data)
            });
    }, []);

    // User saves new note
    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        axios
            .post('http://localhost:3001/notes', noteObject)
            .then( response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
                }
            );
    }

    //
    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    // Able to show only important notes
    const notesToShow = showAll
        ? notes
        : notes.filter( note => note.important)


    // Items to render
    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={ () => setShowAll(!showAll) }>
                    Show {showAll ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map( note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type='submit'>Save</button>
            </form>
        </div>
    );
}

export default App;
