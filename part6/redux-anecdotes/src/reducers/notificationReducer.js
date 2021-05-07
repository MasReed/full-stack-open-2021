const notificationReducer = (state = 'Hello World', action) => {
  console.log('=====Notifications=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      const Obj = {
        display: action.display,
        message: action.message
      }
      return Obj
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

export const notificationCreator = (display, message) => {
  return {
    type: 'SET_NOTIFICATION',
    display,
    message,
  }
}

export const notificationReseter = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  }
}

export default notificationReducer
