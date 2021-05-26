import { toastNotificationCreator } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

// returns null if no such item is stored
const storedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

const userReducer = (state = storedUser, action) => {
  // console.log('=====User=====')
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {

  case 'SET_USER':
    return action.data

  case 'UNSET_USER':
    return null

  default:
    return state
  }
}

export default userReducer

/*
Following action creators update data on backend through userService, then
dispatch an action to update the store with the response. Potentially
displays messages to the user.
*/

export const loggedInUserCreator = (username, password) => {
  return async dispatch => {
    try {
      // log user in on backend
      const user = await loginService.login({
        username, password
      })

      // persist user in local storage
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      // allows user to interact with blogs
      blogService.setToken(user.token)

      // dispatch action to update store/state
      dispatch({
        type: 'SET_USER',
        data: user
      })

      dispatch(toastNotificationCreator(
        `${username} successfully logged in!`,
        'success'
      ))

    } catch (exception) {

      dispatch(toastNotificationCreator(
        'Invalid Username or Password',
        'danger'
      ))
    }
  }
}

export const unsetUserCreator = () => {
  return {
    type: 'UNSET_USER'
  }
}

export const setUserCreator = (username) => {
  return {
    type: 'SET_USER',
    data: username
  }
}
