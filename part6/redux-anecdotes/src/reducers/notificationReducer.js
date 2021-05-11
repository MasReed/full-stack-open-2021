const notificationReducer = (state = 'Hello World', action) => {
  console.log('=====Notifications=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      const setObj = {
        display: action.display,
        message: action.message
      }
      return setObj
    case 'UNSET_NOTIFICATION':
      const resetObj = {
        display: '',
        message: ''
      }
      return resetObj
    default:
      return state
  }
}


let timerId = null
export const toastNotification = (display, message, seconds) => {
  clearTimeout(timerId)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      display,
      message,
    })
    timerId = setTimeout(() => dispatch({type: 'UNSET_NOTIFICATION'}), (seconds * 1000))
  }
}

export default notificationReducer
