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
