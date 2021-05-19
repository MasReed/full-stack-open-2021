
const notificationReducer = (state = { message: '', color: 'darkgrey' }, action) => {
  // console.log('=====Notifications=====')
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
  case 'SET_NOTIFICATION': {
    const setObj = {
      message: action.data.message,
      color: action.data.color
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


export const notificationCreator = (message, color) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      message: message,
      color: color
    }
  }
}


export const notificationReseter = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  }
}
