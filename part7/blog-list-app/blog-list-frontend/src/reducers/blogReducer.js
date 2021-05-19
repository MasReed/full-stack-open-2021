
const blogReducer = (state = [], action) => {
  switch (action.type) {

  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    console.log('NEW_BLOGS_STATE', [...state, action.data])
    return [...state, action.data]

  default:
    return state
  }
}

export default blogReducer

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const blogCreator = () => {
  return {
    type: 'NEW_BLOG',
    data: {
    }
  }
}
