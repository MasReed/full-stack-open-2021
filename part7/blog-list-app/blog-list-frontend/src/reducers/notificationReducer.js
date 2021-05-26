
const notificationReducer = (state = { message: '', variant: 'secondary' }, action) => {
  // console.log('=====Notifications=====')
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
  case 'SET_NOTIFICATION': {
    const setObj = {
      message: action.message,
      variant: action.variant
    }
    return setObj
  }
  case 'UNSET_NOTIFICATION': {
    const resetObj = {
      message: '',
      variant: 'secondary'
    }
    return resetObj
  }
  default:
    return state
  }
}

export default notificationReducer

/* Display colored banner with message for user to see for 5 seconds */
let timerId = null
export const toastNotificationCreator = (message, variant) => {
  clearTimeout(timerId)

  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      variant
    })
    timerId = setTimeout(() => dispatch({ type: 'UNSET_NOTIFICATION' }), 5000)
  }
}
