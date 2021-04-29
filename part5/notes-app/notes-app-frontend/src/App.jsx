import React, { useState, useEffect, useRef } from 'react';
import loginService from './services/login.js';
import noteService from './services/notes.js';
// Components
import Footer from './Footer.jsx';
import LoginForm from './components/LoginForm';
import Note from './Note.jsx';
import NoteForm from './components/NoteForm';
import Notification from './Notification.jsx';
import Togglable from './components/Togglable';

// Main App
const App = () => {

    // Stateful Data
    const [ notes, setNotes ] = useState([]);
    const [ showAll, setShowAll ] = useState(true);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ user, setUser ] = useState(null)

    // Fetch Data from json-server
    useEffect( () => {
        noteService
            .getAll()
            .then( initialNotes => {
                setNotes(initialNotes)
            });
    }, []);

    // persist user login
    useEffect( () => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    //
    const noteFormRef = useRef()

    // User saves new note
    const addNote = (noteObject) => {
        noteFormRef.current.toggleVisibility()
        noteService
            .create(noteObject)
            .then( returnedNote => {
                setNotes(notes.concat(returnedNote))
                }
            );
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
                setErrorMsg(
                    `Note '${note.content}' does not exist on the server.`
                )
                setTimeout( () => {
                    setErrorMsg(null)
                }, 5000)
                // setNotes(notes.filter( n => n.id !== id ))
            });
    }

    const handleLogin = async (userObject) => {

        try {
            const user = await loginService.login(userObject)

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            noteService.setToken(user.token)
            setUser(user)

        } catch (exception) {
            setErrorMsg('Invalid credentials')
            setTimeout( () => {
                setErrorMsg(null)
            }, 5000)
        }
        console.log('logging in with', userObject.username)
    }


    const handleLogout = async (event) => {
        event.preventDefault()

        setUser(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }


    // Items to render
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMsg} />

            {user === null ?
                <Togglable buttonLabel='Login'>
                    <LoginForm handleSubmit={handleLogin}/>
                </Togglable>
                : <div>
                    <p>{user.name} logged in</p>
                    <button onClick={handleLogout}>Logout</button>
                    <Togglable buttonLabel='New Note' ref={noteFormRef}>
                        <NoteForm createNote={addNote}/>
                    </Togglable>
                </div>
            }

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

            <Footer />
        </div>
    );
}

export default App;
