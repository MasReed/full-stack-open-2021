import React, { useState } from 'react';
import Note from './Note.jsx';

// Main App
const App = () => {

    // Temp Data
    const tempNotes = [
      {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: false
      },
      {
        id: 2,
        content: 'Browser can execute only JavaScript',
        date: '2019-05-30T18:39:34.091Z',
        important: true
      },
      {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true
      }
    ];

    // Stateful Data
    const [ notes, setNotes ] = useState(tempNotes);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);

    // User saves new note
    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }
        setNotes(notes.concat(noteObject));
        setNewNote('');
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value);
        setNewNote(event.target.value);
    }

    const notesToShow = showAll
        ? notes
        : notes.filter( note => note.important === true )


    // Items to render
    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button onClick={ () => setShowAll(!showAll)}>
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
