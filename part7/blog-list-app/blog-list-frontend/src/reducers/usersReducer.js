import userService from '../services/users'

const usersReducer = ( state = [], action) => {
  console.log('=====Users=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

  case 'INIT_USERS':
    return action.data

  default:
    return state
  }
}

export default usersReducer

/*
Action creator updates data on backend through userService, then
dispatch an action to update the redux store with the response.
*/

export const initializeUsers = () => {
  return async dispatch => {
    try {
      const users = await userService.getAll()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}
