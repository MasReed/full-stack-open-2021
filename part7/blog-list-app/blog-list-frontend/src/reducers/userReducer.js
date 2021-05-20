import { toastNotificationCreator } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state = null, action) => {
  console.log('=====Users=====')
  console.log('state now: ', state)
  console.log('action', action)

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

      dispatch({
        type: 'SET_USER',
        data: user
      })

      dispatch(toastNotificationCreator(
        `${username} successfully logged in!`,
        'green'
      ))

    } catch (exception) {

      // dispatch(toastNotificationCreator(
      //   'Invalid Username or Password',
      //   'red'
      // ))
    }
  }
}

export const unsetUserCreator = () => {
  return {
    type: 'UNSET_USER'
  }
}
