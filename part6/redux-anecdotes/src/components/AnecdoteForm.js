import React from 'react'
import { useDispatch } from 'react-redux'
import { anecdoteCreator } from '../reducers/anecdoteReducer'
import { notificationCreator, notificationReseter } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(anecdoteCreator(newAnecdote))
    dispatch(notificationCreator('Green', 'Created!'))
    setTimeout(() => dispatch(notificationReseter()), 5000)
  }

  return(
    <div>
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

export default AnecdoteForm
