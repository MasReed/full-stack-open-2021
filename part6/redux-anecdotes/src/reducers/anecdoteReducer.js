import anecdoteService from '../services/anecdotes'

const asObject = (anecdoteId, anecdoteContent) => {
  return {
    content: anecdoteContent,
    id: anecdoteId,
    votes: 0
  }
}

const upVote = (array, id) => {
  // return new array with updated votes
  const updatedState = array.map( anecdote => {
    const votes = anecdote.votes
    return(
      anecdote.id === id ? { ...anecdote, votes: votes + 1 } : anecdote
    )
  })
  return updatedState
}

const anecdoteReducer = (state = [], action) => {
  console.log('=====Anecdotes=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LIKE':
      return upVote(state, action.id)
    case 'NEW':
      return [...state, asObject(action.id, action.data)]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer

export const anecdoteCreator = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'NEW',
      id: newAnecdote.id,
      data: newAnecdote.content
    })
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const upVoteCreator = (id) => {
  return async dispatch => {
    const anecdoteToUpdate = await anecdoteService.getOne(id)
    const initialVotes = anecdoteToUpdate.votes
    const newObject = { ...anecdoteToUpdate, votes: (initialVotes + 1) }
    const response = await anecdoteService.update(id, newObject)
    dispatch({
      type: 'LIKE',
      id: id,
      votes: response.votes
    })
  }
}
