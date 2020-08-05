import React from 'react'
import Blog from '../components/Blog'

const BlogList = ({blogs}) => {
  return (
    <div>
      {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
    </div>
)
}

export default BlogList