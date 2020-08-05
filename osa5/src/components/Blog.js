import React, {useState} from 'react'
import '../App.css'

const Blog = ({ blog , addLike, deleteBlog, user}) => {
  const [full, setFull] = useState(false)

  const toggleFull = () => setFull(!full)

  return(
    full
      ?
      <div className = "Blog">
        {blog.title} {blog.author} 
        <button onClick={()=> toggleFull()}>hide</button><br/>
        {blog.url}<br/>
        likes {blog.likes} 
        <button onClick={()=> addLike(blog)}>like</button><br/>
        {blog.user.username}<br/>
        {user.username === blog.user.username ?
        <button style = {{color: 'white',backgroundColor: 'blue'}} 
        onClick={()=> deleteBlog(blog)}>
        remove
        </button> :
        null}
      </div>
      :
      <div className = "Blog">
      {blog.title} {blog.author} 
      <button onClick={()=> toggleFull()}>show</button>
    </div>
    )

}

export default Blog
