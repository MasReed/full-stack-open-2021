
const blogReducer = (state = [], action) => {
  switch (action.type) {

  case 'SET_BLOGS':
    console.log('SET_BLOGS', state)
    state = action.data
    console.log('BLOGS_SET', state)
    return state

  case 'GET_BLOGS':
    console.log('GET_BLOGS_STATE', state)
    return state

  case 'NEW_BLOG':
    console.log('NEW_BLOGS_STATE', [...state, action.data])
    return [...state, action.data]
  default:
    return state
  }
}

export default blogReducer
