import React from 'react'
import Blog from '../components/Blog'

const BlogList = ({ blogs, addLike, deleteBlog, user }) => {
  blogs.sort((a,b) => (b.likes-a.likes))
  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          addLike = {addLike}
          deleteBlog = {deleteBlog}
          user = {user}
        />
      )}
    </div>
  )
}

export default BlogList