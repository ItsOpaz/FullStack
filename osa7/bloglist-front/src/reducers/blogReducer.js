import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'VOTE':
    return state.map(x => x.id !== action.update.id ? x : action.update)
  case 'NEW_BLOG':
    return [...state, action.newBlog]
  case 'INIT_BLOGS':
    return action.data
  case 'REMOVE' :
    return state.filter(x => x.id !== action.deleted)
  case 'COMMENT':
    return state.map(x => x.id !== action.commented.id ? x : action.commented)
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const likeFor = (blog) => {
  return async dispatch => {
    const update = await blogService.update(blog)
    dispatch({
      type: 'VOTE',
      update
    })
    dispatch(setNotification(`you liked '${blog.title}'`, false, 5))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      newBlog
    })
    dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added!`, false, 5))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const deleted = await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE',
      deleted
    })
    dispatch(setNotification(`blog '${blog.title}' was deleted`, false, 5))
  }
}

export const addComment = (blog, comment ) => {
  return async dispatch => {
    const commented = await blogService.postComment(blog.id, comment)
    console.log(commented)
    dispatch({
      type: 'COMMENT',
      commented
    })
  }
}

export default blogReducer