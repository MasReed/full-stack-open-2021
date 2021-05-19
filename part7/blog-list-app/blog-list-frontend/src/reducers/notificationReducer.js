
const notificationReducer = (state = { message: '', color: 'darkgrey' }, action) => {
  // console.log('=====Notifications=====')
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
  case 'SET_NOTIFICATION': {
    const setObj = {
      message: action.message,
      color: action.color
    }
    return setObj
  }
  case 'UNSET_NOTIFICATION': {
    const resetObj = {
      message: '',
      color: 'darkgrey'
    }
    return resetObj
  }
  default:
    return state
  }
}

export default notificationReducer


let timerId = null
export const toastNotificationCreator = (message, color) => {
  clearTimeout(timerId)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      color
    })
    timerId = setTimeout(() => dispatch({ type: 'UNSET_NOTIFICATION' }), 5000)
  }
}
