import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('=====Blogs=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    console.log('NEW_BLOGS_STATE', [...state, action.data])
    return [...state, action.data]

  case 'LIKE_BLOG':
    console.log('LIEKBLOG')
    return [...state, action.data]

  default:
    return state
  }
}

export default blogReducer

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const blogCreator = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const blogLikeUpdater = (id) => {
  return async dispatch => {
    const blogToLike = await blogService.getOne(id)
    const initialLikes = blogToLike.likes
    const blogWithUpdatedLikes = { ...blogToLike, votes: (initialLikes + 1) }
    const updatedBlog = await blogService.update(id, blogWithUpdatedLikes)
    dispatch({
      type: 'UPDATED_BLOG',
      data: updatedBlog
    })
  }
}
