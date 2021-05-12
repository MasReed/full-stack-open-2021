import React, { useState } from 'react'
import {
  Switch, Route, Link,
  useParams, useHistory
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to='/'>Home</Link>
      <Link style={padding} to='/create'>Create New</Link>
      <Link style={padding} to='/about'>About</Link>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => Number(anecdote.id) === Number(id))

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <h4>by {anecdote.author}</h4>
      <p> has {anecdote.votes} votes</p>
      <p>{anecdote.info}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content} </Link>
        </li>)
      }
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div style={{margin: '300px 32% 100px', textAlign: 'center'}}>
    <p>Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.</p>
    <p>See the <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>github repository</a></p>
  </div>
)

const CreateNew = (props) => {

  const history = useHistory()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.attributes.value,
      author: author.attributes.value,
      info: info.attributes.value,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = (e) => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} style={{display: 'inline'}}>
        <div style={{margin: '3px 0'}}>
          content
          <input style={{marginLeft: '5px'}} name='content' {...content.attributes} />
        </div>
        <div style={{margin: '3px 0'}}>
          author
          <input style={{marginLeft: '11px'}} name='author' {...author.attributes} />
        </div>
        <div style={{margin: '3px 0'}}>
          url
          <input style={{marginLeft: '34px'}} name='info' {...info.attributes} />
        </div>
        <button type='submit' style={{marginRight: '6px', padding: '2px 37px'}}>create</button>
      </form>
      <button onClick={() => handleReset()} style={{display: 'inline', padding: '2px 37px'}}>reset</button>
    </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`A new anecdote '${anecdote.content}' was added!`)
    setTimeout(() => setNotification(''), 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />

      {notification}

      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdotes={anecdotes} />
        </Route>

        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>

        <Route path='/about'>
          <About />
        </Route>

        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}

export default App;
