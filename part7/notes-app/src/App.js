import React, { useState } from 'react'
import {
  Switch, Route, Link, Redirect,
  useHistory, useRouteMatch
} from 'react-router-dom'

import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>Some homepage text</p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    <Table striped>
      <tbody>
        {notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

const Users = () => (
  <div>
    <h2>Users List</h2>
    <ul>
      <li>Mock User 1</li>
      <li>Mock User 2</li>
      <li>Mock User 3</li>
    </ul>
  </div>
)

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('thisUser')
    history.push('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control type='text' name='username' />
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' />
          <Button variant='primary' type='submit'>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}


const App = () => {

  const [notes, setNotes] = useState([
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen'
    },
    {
      id: 2,
      content: 'Browser can execute only Javascript',
      important: false,
      user: 'Matti Luukkainen'
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas'
    }
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const padding = {
    padding: 5
  }

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const match = useRouteMatch('/notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null


  return (
    <div className='container'>
      <div>
        {(message &&
          <Alert variant='success'>{message}</Alert>
        )}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">notes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={padding}>{user} logged in</em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

      <Switch>
        <Route path='/notes/:id'>
          <Note note={note} />
        </Route>

        <Route path='/notes'>
          <Notes notes={notes} />
        </Route>

        <Route path='/users'>
          {user ? <Users /> : <Redirect to='/login' /> }
        </Route>

        <Route path='/login'>
          <Login onLogin={login} />
        </Route>

        <Route path='/'>
          <Home />
        </Route>

      </Switch>

      <div>
        <br />
        <i>Note app, CR 2021</i>
      </div>
    </div>
  )
}

export default App;
