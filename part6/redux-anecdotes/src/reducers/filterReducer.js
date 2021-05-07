
const filterReducer = (state = 'ALL', action) => {
  console.log('=====FILTER=====')
  console.log('state now', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER':
      if (action.filter === '' || action.filter === null) {
        return 'ALL'
      } else {
        return action.filter.toLocaleLowerCase()
      }
    default:
      return state
  }
}

export const filterCreator = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer
