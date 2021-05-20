import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('=====Blogs=====')
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {

  case 'INIT_BLOGS':
    return action.data

  case 'NEW_BLOG':
    return [...state, action.data]

  case 'DELETE_BLOG':
    return state.filter(blog =>
      blog.id !== action.data.id
    )

  case 'LIKE_BLOG':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )

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

export const blogDestroyer = (id) => {
  return async dispatch => {
    await blogService.deletePost(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id: id
      }
    })
  }
}

export const blogLikeUpdater = (blogToUpdate) => {
  return async dispatch => {
    const initialLikes = blogToUpdate.likes
    const blogWithUpdatedLikes = { ...blogToUpdate, likes: (initialLikes + 1) }
    const updatedBlog = await blogService.update(blogToUpdate.id, blogWithUpdatedLikes)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}
