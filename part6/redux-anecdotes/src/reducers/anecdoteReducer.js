const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
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

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('========================')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LIKE':
      return upVote(state, action.id)
    case 'NEW':
      return [...state, asObject(action.data)]
    default:
      return state
  }
}

export default reducer

export const upVoteCreator = (id) => {
  return {
    type: 'LIKE',
    id: id
  }
}

export const anecdoteCreator = (content) => {
  return {
    type: 'NEW',
    data: content
  }
}