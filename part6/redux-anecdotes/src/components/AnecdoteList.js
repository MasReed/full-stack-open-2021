import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { upVoteCreator } from '../reducers/anecdoteReducer'
import { notificationCreator, notificationReseter } from '../reducers/notificationReducer'

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

  // Sort and Filter logic through useSelector
  // TODO: See if state can further be decoupled
  const anecdotes = useSelector(state => {
    if (state.filters === 'ALL') {
      return sortAnecdotes(state.anecdotes, 'votes')
    } else {
      const filteredAnecdotes = state.anecdotes.filter( item => item.content.toLocaleLowerCase().includes(state.filters) )
      return sortAnecdotes(filteredAnecdotes, 'votes')
    }
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(upVoteCreator(id))
    dispatch(notificationCreator('Blue', 'Voted!'))
    setTimeout(() => dispatch(notificationReseter()), 5000)
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
