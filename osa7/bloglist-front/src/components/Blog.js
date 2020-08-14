import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeFor, removeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'


export const Blog = ({ blog }) => {
  return (
    <tr>
      <td>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </td>
    </tr>
  )
}

export const BlogInfo = ({ blogs, user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(n => n.id === id)
  const comment = useField('text')

  const newComment = (event) => {
    event.preventDefault()
    if(comment){
      dispatch(addComment(blog, comment.value))}
  }
  if(!blog){
    return null
  }
  return(
    <div>
      <h1>{blog.title} {blog.author}</h1>
      <Link to={blog.url}>
        {blog.url}
      </Link><br/>
      {blog.likes} likes <button onClick={() => dispatch(likeFor(blog))}>like</button><br/>
      added by {blog.user.name}
      {user.name===blog.user.name? <button onClick={() => dispatch(removeBlog(blog))}>remove</button> : null}
      <h2>comments</h2>
      <form onSubmit={newComment}>
        <input {...comment}/>
        <button type='submit'>add comment</button>
      </form>
      {blog.comments? blog.comments.map(x => <li key = {x}>{x}</li>) : null }
    </div>
  )
}

export const UsersBlogs = ({ users }) => {
  const id = useParams().id
  const user = users.find(n => n.id === id)
  if(!user){
    return null
  }
  return(
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}