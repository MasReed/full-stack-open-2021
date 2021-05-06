import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { upVoteCreator, anecdoteCreator } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  const sortAnecdotes = (array, prop) => {
    const copy = [...array]
    const sortFn = (a, b) => {
      if (a[prop] < b[prop]) {
        return 1
      } else {
        return -1
      }
    }
    return copy.sort(sortFn)
  }

  const anecdotes = useSelector(state => sortAnecdotes(state, 'votes'))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upVoteCreator(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    dispatch(anecdoteCreator(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div style={{margin: '10px 0px'}} key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes} votes
            <button style={{marginLeft: '20px'}} onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm />
    </div>
  )
}

export default App
