import React, { useState, useEffect } from 'react';
import loginService from './services/login.js';
import noteService from './services/notes.js';
// Components
import Footer from './Footer.jsx';
import LoginForm from './components/LoginForm';
import Note from './Note.jsx';
import Notification from './Notification.jsx';
import Togglable from './components/Togglable';

// Main App
const App = () => {

    // Stateful Data
    const [ notes, setNotes ] = useState([]);
    const [ newNote, setNewNote ] = useState('a new note...');
    const [ showAll, setShowAll ] = useState(true);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
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
                setErrorMsg(
                    `Note '${note.content}' does not exist on the server.`
                )
                setTimeout( () => {
                    setErrorMsg(null)
                }, 5000)
                // setNotes(notes.filter( n => n.id !== id ))
            });
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedNoteappUser', JSON.stringify(user)
            )

            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMsg('Invalid credentials')
            setTimeout( () => {
                setErrorMsg(null)
            }, 5000)
        }
        console.log('logging in with', username, password)
    }


    const handleLogout = async (event) => {
        event.preventDefault()

        setUser(null)
        window.localStorage.removeItem('loggedNoteappUser')
    }

    const noteForm = () => (
        <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}/>
            <button type='submit'>Save</button>
        </form>
    )


    // Items to render
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMsg} />

            {user === null ?
                <Togglable buttonLabel='Login'>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={ ({ target }) => setUsername(target.value)}
                        handlePasswordChange={ ({ target }) => setPassword(target.value)}
                        handleSubmit={handleLogin}
                    />
                </Togglable>
                : <div>
                    <p>{user.name} logged in</p>
                    {noteForm()}
                    <button onClick={handleLogout}>Logout</button>
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


// {user === null ?
//     loginForm() :
//     <div>
//         <p>{user.name} logged-in</p>
//         {noteForm()}
//     </div>
// }
