import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const sort = (array, prop) => {
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

const App = () => {
  const anecdotes = useSelector(state => sort(state, 'votes'))
  const dispatch = useDispatch()



  const vote = (id) => {
    dispatch({
      type: 'LIKE',
      id: id
    })
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    dispatch({
      type: 'NEW',
      data: content
    })
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
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='newInput'/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App
