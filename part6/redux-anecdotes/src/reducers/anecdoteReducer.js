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
  return {
    type: 'NEW',
    id: data.id,
    data: data.content
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const upVoteCreator = (id) => {
  return {
    type: 'LIKE',
    id: id
  }
}
