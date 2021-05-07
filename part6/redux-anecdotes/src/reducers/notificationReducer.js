const notificationReducer = (state = 'Hello World', action) => {
  console.log('=====Notifications=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION':
      return state
    case 'NEW':
      return state
    default:
      return state
  }
}

export const notificationChange = message => {
  return {
    type: 'SET_NOTIFICATION',
    message,
  }
}

export default notificationReducer
