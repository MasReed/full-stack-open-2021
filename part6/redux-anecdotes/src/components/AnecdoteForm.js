import React from 'react'
import { useDispatch } from 'react-redux'
import { anecdoteCreator } from '../reducers/anecdoteReducer'
import { toastNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.newInput.value
    event.target.newInput.value = ''
    dispatch(anecdoteCreator(content))
    dispatch(toastNotification('Green', 'Created!', 5))
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
