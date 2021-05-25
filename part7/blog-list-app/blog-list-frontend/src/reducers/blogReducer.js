import blogService from '../services/blogs'
import { toastNotificationCreator } from '../reducers/notificationReducer'

const blogReducer = (state = [], action) => {
  // console.log('=====Blogs=====')
  // console.log('state now: ', state)
  // console.log('action', action)

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

  case 'NEW_COMMENT':
    return state.map(blog =>
      blog.id !== action.data.id ? blog : action.data
    )

  default:
    return state
  }
}

export default blogReducer

/*
Following action creators update data on backend through blogService, then
dispatch an action to update the redux store with the response. Potentially
displays messages to the user.
*/

export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogCreator = (blogObject) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogDestroyer = (id) => {
  return async dispatch => {
    try {
      await blogService.deletePost(id)
      dispatch({
        type: 'DELETE_BLOG',
        data: {
          id: id
        }
      })
      dispatch(toastNotificationCreator(
        'Blog Deleted.',
        'orange'
      ))
    } catch (exception) {
      console.log(exception)
    }
  }
}

export const blogLikeUpdater = (blogToUpdate) => {
  return async dispatch => {
    try {
      const initialLikes = blogToUpdate.likes
      const blogWithUpdatedLikes = { ...blogToUpdate, likes: (initialLikes + 1) }
      // update likes on backend
      const updatedBlog = await blogService.update(blogToUpdate.id, blogWithUpdatedLikes)
      dispatch({
        type: 'LIKE_BLOG',
        data: updatedBlog
      })
      dispatch(toastNotificationCreator(
        'Liked!',
        'blue'
      ))
    } catch (exception) {
      dispatch(toastNotificationCreator(
        `${exception}`,
        'red'
      ))
    }
  }
}

export const blogCommentCreator = (blogId, comment) => {
  return async dispatch => {
    try {
      const addedComment = await blogService.addComment(blogId, comment)
      dispatch({
        type: 'NEW_COMMENT',
        data: addedComment
      })
      dispatch(toastNotificationCreator(
        'Comment Added!',
        'blue'
      ))
    } catch (exception) {
      dispatch(toastNotificationCreator(
        `${exception}`,
        'red'
      ))
    }
  }
}
