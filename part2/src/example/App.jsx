// Modules
import React, { useState, useEffect } from 'react';
// Services
import noteService from './services/notes.js';
// Components
import Note from './Note.jsx';

// Main App
const App = () => {

    // Stateful Data
    const [ notes, setNotes ] = useState([]);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);


    // Fetch Data from json-server
    useEffect( () => {
        noteService
            .getAll()
            .then( initialNotes => {
                setNotes(initialNotes)
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

        noteService
            .create(noteObject)
            .then( returnedNote => {
                setNotes(notes.concat(returnedNote))
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


    //
    const toggleImportanceOf = (id) => {
        const note = notes.find( n => n.id === id )
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then( returnedNote => {
                setNotes(notes.map( note => note.id !== id ? note : returnedNote))
            })
            .catch( error => {
                alert(`The note '${note.content}' does not exist.`)
                setNotes(notes.filter( n => n.id !== id ))
            });
    }


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
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportance={ () => toggleImportanceOf(note.id) }
                    />
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
