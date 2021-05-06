import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upVoteCreator } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

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

  return (
    <div>
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
    </div>
  )
}

export default AnecdoteList
