import React, { useState } from 'react'
import '../App.css'

const Blog = ({ blog , addLike, deleteBlog, user }) => {
  const [status, setStatus] = useState(false)

  const toggleStatus = () => setStatus(!status)

  return(
    status
      ?
      <div className = "Blog">
        {blog.title} {blog.author}
        <button onClick={() => toggleStatus()}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes}
        <button onClick={() => addLike(blog)}>like</button><br/>
        {blog.user.username}<br/>
        {user.username === blog.user.username ?
          <button style = {{ color: 'white',backgroundColor: 'blue' }}
            onClick={() => deleteBlog(blog)}>
        remove
          </button> :
          null}
      </div>
      :
      <div className = "Blog">
        {blog.title} {blog.author}
        <button onClick={() => toggleStatus()}>show</button>
      </div>
  )

}

export default Blog
